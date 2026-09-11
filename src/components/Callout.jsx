import clsx from 'clsx'

/**
 * A tinted aside for a warning, a tip, or a trap.
 *
 * `not-prose` on the wrapper is deliberate and load-bearing. Without it a
 * Callout inherits the prose theme, so on a dark page its `strong` picked up
 * `--tw-prose-invert-bold` (zinc-200) and landed near-white on the light tint —
 * the numbers the callout exists to show were invisible (1.17:1). Opting out
 * means the card owns its own typography, and since Preflight zeroes every
 * margin, the block spacing and the blockquote/list rules below are not
 * decoration: they replace exactly what `not-prose` strips.
 *
 * The card carries a uniform hairline border rather than a thick left rail.
 * Type is already signalled four ways — icon colour, border colour, background
 * tint and text colour — so a rail added emphasis, not information.
 */
const styles = {
  tip: 'border-blue-500 bg-blue-50 text-blue-900 [&_blockquote]:border-blue-500/40 dark:border-blue-400/70 dark:bg-blue-400/10 dark:text-blue-100 dark:[&_blockquote]:border-blue-300/40',
  warning:
    'border-amber-500 bg-amber-50 text-amber-900 [&_blockquote]:border-amber-500/40 dark:border-amber-400/70 dark:bg-amber-400/10 dark:text-amber-100 dark:[&_blockquote]:border-amber-300/40',
  danger:
    'border-red-500 bg-red-50 text-red-900 [&_blockquote]:border-red-500/40 dark:border-red-400/70 dark:bg-red-400/10 dark:text-red-100 dark:[&_blockquote]:border-red-300/40',
}

// The resting `-500` icons are too dark to read against the translucent dark
// tints, which sit only a little above the zinc-900 panel.
const iconStyles = {
  tip: 'h-6 w-6 text-blue-500 dark:text-blue-300',
  warning: 'h-6 w-6 text-amber-500 dark:text-amber-300',
  danger: 'h-6 w-6 text-red-500 dark:text-red-300',
}

export function Callout({ type = 'tip', title, children }) {
  const icons = {
    tip: (
      <svg
        className={iconStyles.tip}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    warning: (
      <svg
        className={iconStyles.warning}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    danger: (
      <svg
        className={iconStyles.danger}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  }

  return (
    <div
      className={clsx(
        'not-prose my-8 flex rounded-xl border p-4 leading-7',
        styles[type],
      )}
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <div className="ml-4 flex-1">
        {title && (
          <h4 className="m-0 text-sm font-bold uppercase tracking-wider">
            {title}
          </h4>
        )}
        {/* Everything below restores what `not-prose` removed: Preflight has
            already zeroed the margins and stripped the list markers. */}
        <div className="mt-2 space-y-3 text-base [&_a]:font-semibold [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic [&_li+li]:mt-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </div>
  )
}
