import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { ChapterNav, ChapterPager } from '@/components/ChapterNav'
import { chapters } from './chapters'
import { ReadingProgressBar } from '@/components/ReadingProgressBar'

/**
 * A multi-chapter reference laid out with a sticky sidebar. Unlike
 * `ArticleLayout`, this does not clamp the body to `max-w-2xl` — the chapters
 * are table-heavy and need the `max-w-5xl` that `Container` already provides at
 * `lg`. Existing articles are untouched.
 */
export default function PersonalFinanceLayout({ children }) {
  return (
    <>
      <ReadingProgressBar />
      <Container className="mt-16 lg:mt-32">
      <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
        <ChapterNav
          chapters={chapters}
          title="Personal Finance for Engineers in India"
        />
        <div className="min-w-0">
          <Prose data-mdx-content>{children}</Prose>
          <ChapterPager chapters={chapters} />
        </div>
      </div>
    </Container>
    </>
  )
}
