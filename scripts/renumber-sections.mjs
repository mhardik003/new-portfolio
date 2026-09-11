// Rewrites every `§` cross-reference in the book after sections have been
// renumbered, reordered, or moved to a different chapter.
//
//   node scripts/gen-sections.mjs && node scripts/renumber-sections.mjs
//
// Reordering a chapter changes its section numbers, and a section number is
// not just a label — it is the citation key the rest of the book uses. Moving
// "Meal cards" from §5.7 to §5.4 silently repoints every `[§5.7](…)` at
// whatever now sits at 5.7. This script closes that gap: give it a map of old
// number -> new number and it rewrites the label, the chapter slug and the
// anchor of every reference, everywhere.
//
// The map lives in `scripts/section-renames.mjs` and is a flat object, because
// section numbers are globally unique (they carry their chapter):
//
//   export const renames = { '14.6': '15.2', '15.13': '17.13' }
//
// The new slug is *derived*, never written by hand: after gen-sections.mjs has
// run, the number -> chapter index in sections.js is the authority on where a
// section now lives. So a section that moved to a different chapter needs no
// special handling — only its new number.
//
// Idempotent in the sense that matters: it is a one-shot migration, so it
// refuses to run twice against the same map. Once a reference has been moved to
// its new number, a second pass would map it again if the map happened to
// contain that number as a key. Delete or empty the map after applying it.

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { sections } from '../src/app/articles/personal-finance-india/sections.js'
import { renames } from './section-renames.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CHAPTERS_DIR = join(ROOT, 'src/app/articles/personal-finance-india')
const BASE = '/articles/personal-finance-india'

/** number -> { slug, id }, built from the freshly generated sections.js. */
function buildIndex() {
  const index = new Map()
  for (const [slug, list] of Object.entries(sections)) {
    for (const section of list) {
      if (section.n === null || section.n === undefined) continue
      if (index.has(section.n)) {
        throw new Error(
          `section number ${section.n} appears in two chapters — ` +
            `${index.get(section.n).slug} and ${slug}`,
        )
      }
      index.set(section.n, { slug, id: section.id })
    }
  }
  return index
}

/**
 * Bare chapter number -> slug, e.g. '17' -> 'numbers'. The book cites whole
 * chapters as well as sections (`[§16](…/forms-and-links)`), and splitting a
 * chapter renumbers every chapter after it, so those references move too.
 * Derived from the section numbers rather than from chapters.js, so it cannot
 * disagree with the anchors.
 */
function buildChapterIndex() {
  const index = new Map()
  for (const [slug, list] of Object.entries(sections)) {
    for (const section of list) {
      if (!section.n) continue
      const chapter = String(section.n).split('.')[0]
      if (!index.has(chapter)) index.set(chapter, slug)
    }
  }
  return index
}

function bookPages() {
  const pages = [join(CHAPTERS_DIR, 'page.mdx')]
  for (const entry of readdirSync(CHAPTERS_DIR).sort()) {
    const page = join(CHAPTERS_DIR, entry, 'page.mdx')
    try {
      if (statSync(join(CHAPTERS_DIR, entry)).isDirectory()) statSync(page)
      else continue
    } catch {
      continue
    }
    pages.push(page)
  }
  return pages
}

// Matches both link forms the book uses:
//   [§14.8](/articles/personal-finance-india/goals-and-real-estate#148-…)
//   [§9.5](#95-health-insurance)                     <- same-page
const REF =
  /\[§(\d+(?:\.\d+)?)([^\]]*)\]\((?:\/articles\/personal-finance-india\/[a-z0-9-]+)?(?:#[^)\s]*)?\)/g

const index = buildIndex()
const chapterIndex = buildChapterIndex()
const entries = Object.entries(renames)

if (!entries.length) {
  console.log('section-renames.mjs is empty — nothing to do.')
  process.exit(0)
}

// Fail before writing anything if the map is not self-consistent.
const problems = []
for (const [from, to] of entries) {
  const known = to.includes('.') ? index.has(to) : chapterIndex.has(to)
  if (!known) {
    problems.push(`  ${from} -> ${to}: §${to} does not exist in sections.js`)
  }
}
const targets = entries.map(([, to]) => to)
if (new Set(targets).size !== targets.length) {
  problems.push('  two sections map to the same new number')
}
if (problems.length) {
  console.error('refusing to run — the rename map is inconsistent:')
  problems.forEach((p) => console.error(p))
  process.exit(1)
}

let filesChanged = 0
let rewritten = 0
let untouched = 0
const unknown = []

for (const page of bookPages()) {
  const before = readFileSync(page, 'utf8')
  const pageSlug = relative(CHAPTERS_DIR, dirname(page)) || null

  const after = before.replace(REF, (match, n, rest) => {
    const to = renames[n]
    if (!to) {
      untouched += 1
      return match
    }
    // A whole-chapter target has no `.`: it lands at the top of the chapter,
    // so it carries a slug but no anchor.
    if (!to.includes('.')) {
      const slug = chapterIndex.get(to)
      if (!slug) {
        unknown.push({ page, n, to })
        return match
      }
      rewritten += 1
      return `[§${to}${rest}](${BASE}/${slug})`
    }

    const target = index.get(to)
    if (!target) {
      unknown.push({ page, n, to })
      return match
    }
    // A same-page reference stays same-page only if the section is still in
    // this chapter; otherwise it has to become a full path.
    const samePage = target.slug === pageSlug
    const href = samePage
      ? `#${target.id}`
      : `${BASE}/${target.slug}#${target.id}`
    rewritten += 1
    return `[§${to}${rest}](${href})`
  })

  if (after === before) continue
  writeFileSync(page, after, 'utf8')
  filesChanged += 1
}

console.log(
  `${filesChanged} file(s) changed — ${rewritten} reference(s) renumbered, ` +
    `${untouched} left alone, ${unknown.length} unknown`,
)
for (const { page, n, to } of unknown) {
  console.log(`  unknown: §${n} -> §${to} (in ${relative(ROOT, page)})`)
}
if (rewritten) {
  console.log(
    '\nNow empty scripts/section-renames.mjs — the map has been applied.',
  )
}
