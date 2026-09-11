import Image from 'next/image'
import { MdxTable } from '@/components/MdxTable'
import { Figure, FigureGrid } from '@/components/MdxFigure'
import { ChapterIndex } from '@/components/ChapterIndex'
import { Callout } from '@/components/Callout'
import { Ledger } from '@/components/Ledger'

export function useMDXComponents(components) {
  return {
    ...components,
    Image: (props) => <Image {...props} />,
    table: MdxTable,
    Figure,
    FigureGrid,
    ChapterIndex,
    // Registered globally so a chapter can drop in a `<Callout>` without an
    // import line. An explicit `import { Callout }` in an MDX file still wins
    // — a local binding shadows this map — so existing pages are unaffected.
    Callout,
    // Same deal for `<Ledger>`: it replaces the fenced rupee ledgers, which
    // were unreadable on a phone (78 characters wide, ~35 visible).
    Ledger,
  }
}
