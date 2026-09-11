import Image from 'next/image'
import clsx from 'clsx'

/**
 * Figures for MDX articles.
 *
 * Lives in `src/components` rather than in the repo-root `mdx-components.jsx`
 * for the same reason `MdxTable` does: Tailwind's content glob covers only
 * `./src/**\/*.{js,jsx,ts,tsx}`, so classes written at the root — or inside an
 * `.mdx` file — are silently purged.
 *
 * No vertical margins here on purpose. `Prose` already gives every direct child
 * `mt-10 mb-10`, and styles `img` as `rounded-3xl` and `figcaption` for us. A
 * figure inside a `FigureGrid` is not a direct child of the prose root, so the
 * grid's `gap` spaces it instead of a doubled-up margin.
 */
export function Figure({ src, alt, caption, narrow = false, sizes }) {
  return (
    <figure className={clsx(narrow && 'mx-auto max-w-xs')}>
      {/*
        Without `sizes`, next/image treats a static import as fixed-size and
        emits a 1x/2x density srcset — which on a retina screen fetches a far
        larger file than this 672px-wide column can use. The article body never
        exceeds `max-w-2xl`, so say so. A `narrow` figure is capped at
        `max-w-xs`; without its own hint the browser sizes for the full column,
        picks a candidate below 320px and upscales it.
      */}
      <Image
        src={src}
        alt={alt}
        sizes={sizes ?? (narrow ? '320px' : '(min-width: 672px) 672px, 100vw')}
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}

/** Two-up on anything wider than mobile, stacked below it. */
export function FigureGrid({ children }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>
}
