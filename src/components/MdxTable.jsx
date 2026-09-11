/**
 * Wraps MDX tables so a wide table scrolls inside its own column instead of
 * forcing the whole page to scroll sideways. Lives in `src/components` rather
 * than in `mdx-components.jsx` because Tailwind's content glob only covers
 * `./src/**`, so classes written at the repo root would be purged.
 *
 * (The scrolling itself needs `table { width: max-content; min-width: 100% }`
 * in `typography.js` — a `width: 100%` table can never overflow, so this
 * wrapper was inert for as long as that rule stood.)
 *
 * The right-edge fade that advertises the overflow is the two-layer background
 * trick, so it needs no scroll listener and no JavaScript at all:
 *
 *   - the *shadow* layer is `background-attachment: scroll`, so it stays pinned
 *     to the right edge of the visible box;
 *   - the *cover* layer is `background-attachment: local`, so it scrolls with
 *     the table and sits at the right edge of the *content*.
 *
 * The cover is painted in the panel colour (`bg-white dark:bg-zinc-900`, from
 * `Layout`), so it hides the shadow exactly when there is nothing more to see:
 * a table that fits, or one already scrolled to its end. The two colours are
 * set as custom properties so the `dark:` variant can swap them.
 */
export function MdxTable(props) {
  return (
    <div
      className="overflow-x-auto [--table-shadow:rgb(9_9_11/0.18)] [--table-surface:#ffffff] dark:[--table-shadow:rgb(0_0_0/0.55)] dark:[--table-surface:#18181b]"
      style={{
        backgroundImage:
          'linear-gradient(to left, var(--table-surface) 60%, transparent), linear-gradient(to left, var(--table-shadow), transparent)',
        backgroundPosition: 'right center, right center',
        backgroundSize: '2.5rem 100%, 1.25rem 100%',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'local, scroll',
      }}
    >
      <table {...props} />
    </div>
  )
}
