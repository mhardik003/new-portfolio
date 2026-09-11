// Rewrites the book's cross-chapter links so they carry the `#anchor` of the
// section they cite, instead of dumping the reader at the top of the chapter.
//
//   node scripts/gen-sections.mjs && node scripts/fix-section-links.mjs
//
// Run both, in that order, whenever a chapter's `##` headings change. The
// anchors are *derived*, never authored: rehype-slug (see next.config.mjs) puts
// a github-slugger id on every heading, gen-sections.mjs records those ids in
// sections.js, and this script copies them onto the links. Edit a heading and
// only gen-sections.mjs knows the new id — so a heading change that skips this
// step leaves every link to that section pointing at an id that no longer
// exists. Like its sibling, this is deliberately NOT a prebuild hook.
//
// It is idempotent: any `#fragment` already on a matching link is thrown away
// and re-derived, so running it twice is a no-op and running it after a heading
// change repairs the anchors rather than stacking a second one on top.
//
// Whole-chapter references (`[§5](...)`, with no subsection) are left alone —
// the top of the chapter is exactly where they mean to land. A subsection
// reference that sections.js does not know is left alone too, and reported: an
// invented anchor is worse than a link to the top of the page.

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { sections } from '../src/app/articles/personal-finance-india/sections.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CHAPTERS_DIR = join(ROOT, 'src/app/articles/personal-finance-india')
const BASE = '/articles/personal-finance-india'

// [§7.6, and the note there](/articles/personal-finance-india/epf-eps-form-11#76-…)
//  ^ch ^sub ^^^^^^ rest of label           ^slug                      ^ stale anchor
const LINK =
  /\[§(\d+)((?:\.\d+)+)?([^\]]*)\]\(\/articles\/personal-finance-india\/([a-z0-9-]+)(?:#([^)\s]*))?\)/g

/** Every page.mdx in the book: the landing page plus one per chapter dir. */
function bookPages() {
  const pages = [join(CHAPTERS_DIR, 'page.mdx')]
  for (const entry of readdirSync(CHAPTERS_DIR).sort()) {
    const dir = join(CHAPTERS_DIR, entry)
    if (!statSync(dir).isDirectory()) continue
    const page = join(dir, 'page.mdx')
    try {
      statSync(page)
    } catch {
      continue // e.g. /calculator, which is a .jsx page
    }
    pages.push(page)
  }
  return pages
}

let filesChanged = 0
let rewritten = 0
let alreadyCorrect = 0
let wholeChapter = 0
const unresolved = []
const staleManual = []

for (const page of bookPages()) {
  const before = readFileSync(page, 'utf8')

  const after = before.replace(
    LINK,
    (match, chapter, sub, rest, slug, frag) => {
      // No `.<sub>` — a reference to the chapter itself. Correct as written.
      // A few of these carry a hand-written anchor, because some chapters number
      // their headings as "Step 6" rather than "6.4" and so have no `n` to look
      // up. Those cannot be re-derived, so the most this script can do is notice
      // when one has gone stale and say so.
      if (!sub) {
        wholeChapter += 1
        if (frag && !(sections[slug] ?? []).some((s) => s.id === frag)) {
          staleManual.push({ page, frag, slug })
        }
        return match
      }

      const n = `${chapter}${sub}`
      const section = (sections[slug] ?? []).find((s) => s.n === n)
      if (!section) {
        unresolved.push({ page, n, slug })
        return match
      }

      const anchored = `[§${n}${rest}](${BASE}/${slug}#${section.id})`
      if (anchored === match) alreadyCorrect += 1
      else rewritten += 1
      return anchored
    },
  )

  if (after === before) continue
  writeFileSync(page, after, 'utf8')
  filesChanged += 1
}

console.log(
  `${filesChanged} file(s) changed — ${rewritten} link(s) rewritten, ` +
    `${alreadyCorrect} already anchored, ` +
    `${wholeChapter} whole-chapter ref(s) left as-is, ` +
    `${unresolved.length} unresolved`,
)

for (const { page, n, slug } of unresolved) {
  console.log(`  unresolved: §${n} -> ${slug} (in ${relative(ROOT, page)})`)
}

for (const { page, frag, slug } of staleManual) {
  console.log(
    `  stale hand-written anchor: ${slug}#${frag} no longer exists ` +
      `(in ${relative(ROOT, page)})`,
  )
}
