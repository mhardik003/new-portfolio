import clsx from 'clsx'

/**
 * A financial ledger — labels on the left, rupee figures in a right-aligned
 * column — as *layout* rather than as whitespace inside a `<pre>`.
 *
 * Why this exists. Chapters 4, 5 and 6 carry ten fenced code blocks that are
 * really ledgers: a tax computation, an HRA "least of three", an EMI split.
 * They were written as monospace art, 57 to 78 characters wide. `typography.js`
 * gives `pre` `fontSize.sm` and `spacing.8` (2rem) of padding on each side, so
 * a 375px phone shows roughly 35 characters of them. The blocks are
 * right-aligned, which puts the labels in the visible half and **every rupee
 * figure in the invisible one** — in the chapters whose entire point is the
 * figures. They do scroll sideways, but a ledger you have to swipe to read is a
 * ledger nobody reads.
 *
 * Alignment here comes from flexbox and `tabular-nums`, so it reflows to any
 * width: the label wraps, the figure stays on one line at the right edge, and
 * nothing ever scrolls horizontally. Please do not "simplify" this back into a
 * fenced block — the ASCII version is only correct at one viewport width, and
 * it is not the one most readers use.
 *
 * ## Writing rows
 *
 * A row is a terse tuple `[label, amount, variant]`, or an object when it needs
 * more than that:
 *
 * ```jsx
 * <Ledger
 *   title="New regime"
 *   rows={[
 *     ['Gross salary', 1636710],
 *     ['Standard deduction', -75000],
 *     ['Total income', 1561710, 'subtotal'],
 *   ]}
 * />
 * ```
 *
 * `variant` is one of:
 *
 * - *(omitted)* — a plain row.
 * - `'detail'` — an indented, muted working-out line, such as one slab of a tax
 *   computation.
 * - `'subtotal'` — ruled above and set in medium: "Total income", "Tax before
 *   cess". Replaces the `─────` line the source drew by hand.
 * - `'total'` — ruled above with a heavier rule and set bold. The one figure the
 *   block exists to produce; use it once.
 * - `'result'` — total's weight and ink, but no rule. For a figure the rows
 *   above *select* rather than sum: the HRA exemption is the least of three
 *   candidates, and a rule there would claim the three had been added (they
 *   come to ₹9,80,000). Use it wherever a block resolves without arithmetic.
 * - `'heading'` — a label with no amount, opening a group ("Tax computation:").
 *
 * The object form is `{ label, amount, variant, note, indent }`. `note` is the
 * annotation the source wrote as a trailing `← least`; it renders under the
 * figure, in the accent colour, so it can never push the figure off the line.
 * Write it without the arrow — its position now says which row it points at.
 *
 * ## Two conventions worth keeping consistent
 *
 * **Deductions carry their sign in the number, never in the label.** The source
 * writes `Less: Standard deduction` against a bare positive figure; here you
 * write `['Standard deduction', -75000]` and get `−₹75,000`. Doing both reads
 * as a double negative, so drop the "Less:" when you convert a block.
 *
 * **A number is rupees; anything else is a string.** `20000` renders as
 * `₹20,000`; a percentage, a rate or a phrase (`'5%'`, `'Not eligible'`) is
 * passed through verbatim. `0` is a real figure and renders as `₹0` — only
 * `null`/`undefined` means "this row has no amount".
 *
 * ## Implementation notes
 *
 * `not-prose` is required: this renders inside `<Prose>`, which would otherwise
 * inject its own margins into every row. Preflight then zeroes all margins, so
 * the `my-8` on the wrapper and the per-row padding below are not decoration —
 * they replace exactly what `not-prose` strips.
 *
 * Rows are `div`s rather than a `<table>` on purpose. `typography.js` sets
 * `table { width: max-content }` so that wide book tables can scroll, which is
 * the precise behaviour this component was built to avoid.
 *
 * Every row is `text-sm`, including the total. `tabular-nums` only produces a
 * true column among glyphs of one size, so the total is emphasised with weight
 * and ink instead of a larger type size.
 *
 * The visual language (type scale, zinc ink, teal accent, the `py-1.5` row
 * rhythm) is deliberately the same as the private `Row` in
 * `SalaryCalculators.jsx`, so a ledger in a chapter and the calculator at the
 * end of the book read as one artefact.
 */

/**
 * Indian digit grouping — ₹16,36,710, not ₹1,636,710. `toLocaleString('en-IN')`
 * owns the lakh/crore rule; hand-rolling it is how sites end up with ₹1,636,710.
 * The sign is rendered as U+2212 MINUS, which is the width of a digit in a
 * tabular font, rather than a hyphen.
 */
const rupees = (n) => {
  const value = Number.isFinite(n) ? n : 0
  const sign = value < 0 ? '−' : ''
  return `${sign}₹${Math.round(Math.abs(value)).toLocaleString('en-IN')}`
}

const toRow = (row) =>
  Array.isArray(row) ? { label: row[0], amount: row[1], variant: row[2] } : row

function LedgerRow({ label, amount, variant, note, indent }) {
  if (variant === 'heading') {
    return (
      <p className="mt-4 pb-1 text-xs font-semibold uppercase tracking-widest text-zinc-400 first:mt-0 dark:text-zinc-500">
        {label}
      </p>
    )
  }

  const ruled = variant === 'subtotal' || variant === 'total'
  const isIndented = indent === undefined ? variant === 'detail' : indent

  return (
    <div
      className={clsx(
        'flex items-baseline justify-between gap-4 py-1.5',
        isIndented && 'pl-4',
        ruled && 'mt-1 border-t pt-2.5',
        variant === 'result' && 'mt-2 pt-1',
        variant === 'subtotal' && 'border-zinc-200 dark:border-zinc-700',
        variant === 'total' && 'border-zinc-300 dark:border-zinc-600',
      )}
    >
      <span
        className={clsx(
          'min-w-0 text-sm',
          (variant === 'total' || variant === 'result') &&
            'font-semibold text-zinc-800 dark:text-zinc-100',
          variant === 'subtotal' &&
            'font-medium text-zinc-800 dark:text-zinc-100',
          variant === 'detail' && 'text-zinc-500 dark:text-zinc-400',
          !variant && 'text-zinc-600 dark:text-zinc-300',
        )}
      >
        {label}
      </span>

      {amount !== undefined && amount !== null && (
        <span className="shrink-0 text-right">
          <span
            className={clsx(
              'block whitespace-nowrap text-sm tabular-nums',
              (variant === 'total' || variant === 'result') &&
                'font-bold text-zinc-900 dark:text-zinc-50',
              variant === 'subtotal' &&
                'font-semibold text-zinc-900 dark:text-zinc-50',
              variant === 'detail' && 'text-zinc-500 dark:text-zinc-400',
              !variant && 'text-zinc-700 dark:text-zinc-300',
            )}
          >
            {typeof amount === 'number' ? rupees(amount) : amount}
          </span>
          {note && (
            // teal-600 measures 3.8:1 on white, under the 4.5 that 13px text
            // needs; teal-700 gives 5.4 and reads as the same accent.
            <span className="mt-0.5 block text-xs leading-5 text-teal-700 dark:text-teal-400">
              {note}
            </span>
          )}
        </span>
      )}
    </div>
  )
}

export function Ledger({ title, caption, rows = [] }) {
  if (!rows.length) return null

  return (
    <div className="not-prose my-8 rounded-xl border border-zinc-100 bg-zinc-50/60 px-4 py-3 dark:border-zinc-700/40 dark:bg-zinc-800/30">
      {title && (
        // A `p`, not an `h3`: a ledger caption is not a section of the chapter,
        // and the book's heading outline is read by `ChapterIndex`.
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {title}
        </p>
      )}

      <div>
        {rows.map(toRow).map((row, i) => (
          <LedgerRow key={i} {...row} />
        ))}
      </div>

      {caption && (
        <p className="mt-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          {caption}
        </p>
      )}
    </div>
  )
}
