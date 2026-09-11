import { sections as allSections } from '@/app/articles/personal-finance-india/sections'

/**
 * The at-a-glance list of a chapter's `##` sections, rendered just under the
 * chapter title. The sidebar (`ChapterNav`) answers "where am I in the book";
 * this answers "what is in the page I'm on".
 *
 * Section data comes from the generated `sections.js` — run
 * `node scripts/gen-sections.mjs` after editing any chapter's `##` headings.
 * The `id`s it stores are the ones rehype-slug puts on the headings themselves.
 *
 * Wrapped in `not-prose` on purpose: `typography.js` underlines and bolds every
 * prose link, which turns a 17-item index into a wall of blue.
 */
export function ChapterIndex({ slug }) {
  const sections = allSections[slug]
  if (!sections?.length) return null

  // The number gutter has to fit this chapter's widest label — "1.1" is 3
  // glyphs, "15.17" is 5. `ch` is one character advance in a monospace font,
  // so this is exact; a fixed Tailwind width would either clip "15.10" into
  // its own label or leave chapter 1 with a trench of dead space.
  const gutter = `${Math.max(...sections.map((s) => (s.n ?? '·').length))}ch`

  return (
    <nav
      aria-label="Sections in this chapter"
      className="not-prose my-10 rounded-2xl border border-zinc-100 bg-zinc-50/60 px-5 py-4 dark:border-zinc-700/40 dark:bg-zinc-800/30"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
        In this chapter
      </p>
      <ul role="list" className="columns-1 gap-x-8 sm:columns-2">
        {sections.map((section) => (
          <li key={section.id} className="break-inside-avoid">
            <a
              href={`#${section.id}`}
              className="flex items-baseline gap-2 rounded-md py-1 text-sm text-zinc-600 transition hover:text-teal-500 dark:text-zinc-400 dark:hover:text-teal-400"
            >
              <span
                aria-hidden="true"
                style={{ width: gutter }}
                className="shrink-0 text-right font-mono text-xs tabular-nums text-zinc-400 dark:text-zinc-500"
              >
                {section.n ?? '·'}
              </span>
              <span>{section.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
