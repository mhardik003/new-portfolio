'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

function useCurrent(chapters) {
  const pathname = usePathname()
  const index = chapters.findIndex((c) => c.href === pathname)
  return { pathname, index }
}

function ChapterList({ chapters, pathname, onNavigate }) {
  let lastGroup = null

  return (
    <ul role="list" className="space-y-1">
      {chapters.map((chapter) => {
        const isActive = chapter.href === pathname
        const startsGroup = chapter.group !== lastGroup
        lastGroup = chapter.group

        return (
          <li key={chapter.href}>
            {startsGroup && (
              <p className="mb-1 mt-5 text-xs font-semibold uppercase tracking-widest text-zinc-400 first:mt-0 dark:text-zinc-500">
                {chapter.group}
              </p>
            )}
            <Link
              href={chapter.href}
              onClick={onNavigate}
              aria-current={isActive ? 'page' : undefined}
              className={clsx(
                'flex items-baseline gap-2 rounded-md py-1 pl-3 pr-2 text-sm transition',
                isActive
                  ? 'bg-zinc-100 font-semibold text-teal-500 dark:bg-zinc-800/60'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200',
              )}
            >
              <span
                aria-hidden="true"
                className="w-4 shrink-0 text-right font-mono text-xs tabular-nums text-zinc-400 dark:text-zinc-500"
              >
                {chapter.n === null ? '·' : String(chapter.n).padStart(2, '0')}
              </span>
              <span>{chapter.label}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function ChapterNav({ chapters, title }) {
  const { pathname } = useCurrent(chapters)
  // `<details open>` is uncontrolled DOM state, and this component renders from
  // the segment layout, so it is never remounted between chapters — the drawer
  // opened once and then stayed open for the rest of the book, pushing every
  // subsequent chapter title below ~500px of navigation. Controlling `open`
  // lets the link handler close it; `onToggle` keeps state in step when the
  // reader works the disclosure themselves.
  const [open, setOpen] = useState(false)

  // `chapters` also carries the two entries that are not chapters: the "Start
  // here" landing page (`n: 0`) and the calculators (`n: null`).
  const chapterCount = chapters.filter((c) => c.n !== null && c.n !== 0).length

  return (
    <>
      {/* Mobile: a collapsed disclosure so the chapter list never buries the content */}
      <details
        open={open}
        onToggle={(event) => setOpen(event.currentTarget.open)}
        className="mb-10 rounded-2xl border border-zinc-100 p-4 lg:hidden dark:border-zinc-700/40"
      >
        <summary className="cursor-pointer text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          Contents ({chapterCount} chapters)
        </summary>
        <nav aria-label="Chapters" className="mt-4">
          <ChapterList
            chapters={chapters}
            pathname={pathname}
            onNavigate={() => setOpen(false)}
          />
        </nav>
      </details>

      {/* Desktop: a sticky rail */}
      <nav
        aria-label="Chapters"
        className="sticky top-8 hidden max-h-[calc(100vh-6rem)] self-start overflow-y-auto border-r border-zinc-100 pr-6 lg:block dark:border-zinc-700/40"
      >
        <p className="mb-4 text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          {title}
        </p>
        <ChapterList chapters={chapters} pathname={pathname} />
      </nav>
    </>
  )
}

export function ChapterPager({ chapters }) {
  const { index } = useCurrent(chapters)
  if (index === -1) return null

  const previous = index > 0 ? chapters[index - 1] : null
  const next = index < chapters.length - 1 ? chapters[index + 1] : null
  if (!previous && !next) return null

  return (
    <nav
      aria-label="Chapter navigation"
      className="mt-16 flex gap-4 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
    >
      {previous && (
        <Link
          href={previous.href}
          className="group flex max-w-[48%] flex-col gap-1 rounded-lg border border-zinc-100 px-4 py-3 transition hover:border-teal-500/40 dark:border-zinc-700/40"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Previous
          </span>
          <span className="text-sm font-medium text-zinc-800 group-hover:text-teal-500 dark:text-zinc-100">
            {previous.label}
          </span>
        </Link>
      )}
      {next && (
        <Link
          href={next.href}
          className="group ml-auto flex max-w-[48%] flex-col gap-1 rounded-lg border border-zinc-100 px-4 py-3 text-right transition hover:border-teal-500/40 dark:border-zinc-700/40"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Next
          </span>
          <span className="text-sm font-medium text-zinc-800 group-hover:text-teal-500 dark:text-zinc-100">
            {next.label}
          </span>
        </Link>
      )}
    </nav>
  )
}
