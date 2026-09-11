# The IIIT blog — convert the Notion stub into a rendered in-site article

**Date:** 2026-08-12
**Status:** approved, ready for implementation planning

## Problem

`src/app/articles/iiit-blog/page.mdx` is a metadata-only stub. It exports `article`
and `metadata`, imports `ArticleLayout`, never uses it, and sets
`article.url` to the Notion original. The consequences:

- The card on `/articles` and the home page navigates off-site to Notion.
- The route `/articles/iiit-blog` exists but renders bare site chrome — no title,
  no body.

The source content is a ~2,400-word first-person essay about building the IIITH
WhatsApp community, published on Notion on 11 July 2025, with seven embedded
screenshots.

The in-site plumbing already landed (uncommitted, in the working tree):
`Card.Title` now applies `target="_blank"` only to `^https?://` hrefs, and
`src/app/articles/page.jsx` falls back to `/articles/${slug}` when `article.url`
is absent. So no further routing work is needed — deleting `url` is sufficient to
bring the card in-site.

## Goal

Render the essay at `/articles/iiit-blog` as a single page, faithful to the
original in structure and voice, with its screenshots included and third-party
personal data removed.

## Decisions

Four decisions were settled during brainstorming. They are requirements, not
preferences.

| Decision | Choice |
|---|---|
| Screenshots | Include all seven; blur the PII in two of them |
| Structure | Single page, verbatim — **no added section headings** |
| Copy | Fix typos only; preserve the informal voice exactly |
| Notion original | Drop `article.url`; make **no reference to Notion** anywhere |

## Design

### Routing and layout

The article stays at `src/app/articles/iiit-blog/page.mdx`. It gains a body and a
default export:

```jsx
export default (props) => <ArticleLayout article={article} {...props} />
```

This is the line every article in the repo is currently missing, and it makes
this the first article on the site that actually renders.

`ArticleLayout` is a client component that renders `article.title` as the `<h1>`,
the formatted date above it, the conditional back button, and clamps the body to
`max-w-2xl`.

**Therefore the MDX body must not begin with `# The IIIT Blog`** — the layout
already emits the title, and repeating it produces two `<h1>`s.

No `layout.jsx` and no `chapters.js`. The `personal-finance-india` article needs
those because it is seventeen table-heavy pages wanting `Container`'s `max-w-5xl`
and a sticky `ChapterNav`. A single narrative essay wants the narrow measure that
`ArticleLayout` already provides.

The original's `~ 11th July afternoon` line is rendered as a plain italic line at
the top of the body, below the layout's header, using markdown emphasis. It is
**not** centred: centring would require a Tailwind class, and classes written in
`.mdx` are purged (see the next section). The layout's `<time>` element carries
the real machine-readable date.

`article.url` is deleted. `article.date` stays `2025-07-11`, `article.title` stays
`The IIIT Blog`, and `article.description` stays
`My experiences and thoughts about the IIITH community` — it is the card subtitle
and needs no change.

### A new component for MDX figures

Tailwind's `content` glob in `tailwind.config.js` covers
`./src/**/*.{js,jsx,ts,tsx}` and **not `.mdx`**. Any Tailwind class written inside
an MDX file is purged at build time. The original lays its four "funny buys and
sells" screenshots out in two columns, which requires classes.

Create `src/components/MdxFigure.jsx` exporting two components:

- `Figure` — imports `next/image` **directly** and wraps it with an optional
  caption, accepting a width constraint so a low-resolution image can be rendered
  small and centred rather than stretched.
- `FigureGrid` — a responsive one-column → two-column grid for the collage.

Register both in `mdx-components.jsx` alongside the existing `table: MdxTable`
mapping, so they resolve inside MDX without a per-file import.

Because `Figure` imports `next/image` itself, the MDX never renders a bare
`<Image>`, and the existing `Image` mapping in `mdx-components.jsx` is bypassed
entirely. That mapping is left in place, untouched and unused by this article.

This mirrors the precedent set by `src/components/MdxTable.jsx`, whose header
comment states this exact reasoning: the component lives under `src/components`
rather than in the repo-root `mdx-components.jsx` precisely because of the
Tailwind glob.

Images are supplied to the MDX as static ES-module imports from `src/images/**`,
per the repo's first image convention. The string-path convention used by
`public/images/photography/**` does not apply here and must not be mixed in.

### Image extraction and redaction

Source: `8647ca36-094c-455c-9694-81d70796ec7a_The_IIIT_blog.pdf` in the repo root
(untracked). It embeds seven images:

| Index | PDF page | Pixels | Content | Redact |
|---:|---:|---|---|---|
| 0 | 2 | 385×300 | "Buy Sell Rent @ IIITH" group card, 1,024 members | no |
| 1 | 6 | 1178×1302 | LeetCode subscription-sharing thread | no |
| 2 | 6 | 1179×1507 | Replica AirPods, 3k marked down to 2k | no |
| 3 | 6 | 1176×1371 | HP keyboard priced above MRP, "Effect of offline OAs" | no |
| 4 | 6 | 1116×1600 | "[SELL] RCB for $2 billion" | no |
| 5 | 9 | 1600×1341 | "Mess Buy Sell Rent - 3" thread — the moment it clicked | **yes** |
| 6 | 10 | 1600×957 | Two-pane community management result | **yes** |

Images 1–4 already carry blue scribble redaction applied by the author.

Extract with `pdfimages -png` into `src/images/articles/iiit-blog/`, renamed from
`pdfimages`' index-based output to:

| Index | Filename |
|---:|---|
| 0 | `group-card.png` |
| 1 | `sell-leetcode.png` |
| 2 | `sell-airpods.png` |
| 3 | `sell-keyboard.png` |
| 4 | `sell-rcb.png` |
| 5 | `the-click.png` |
| 6 | `new-community.png` |

Images 5 and 6 contain unredacted third-party personal data — full names and
phone numbers of classmates in message headers, plus a member-list strip across
the window title bar. Blur these regions with a one-off Python/PIL script.

The script is a scratchpad artifact, not repository code. It runs once; the
redacted PNGs are the deliverable.

**The redacted images must be read back and inspected visually before they are
staged.** A blur that leaves a phone number legible is worse than no blur, because
it looks handled. Nothing legible may survive.

Image 0 is 385×300 at 107 ppi. Rendered at the full `max-w-2xl` measure it will
be visibly soft, so it is rendered small and centred — which also matches how it
sits in the original.

### Text conversion

Verbatim, with typographical corrections only.

Corrected: `probablity`→`probability`, `convinient`→`convenient`,
`materalised`→`materialised`, `seperate`/`seperated`→`separate`/`separated`,
`Growed`→`Grew`, `folllowing`→`following`, `corss`→`cross`, `Qoura`→`Quora`,
`accomodate`→`accommodate`, `mulitple`→`multiple`, `Intitally`→`Initially`,
and the broken clause `a got 5-6 messages`→`I got 5-6 messages`.

Preserved exactly: `xD`, `<3`, `puffff`, `sooo`, `bestest`, `hehe`, the lowercase
sentence openings, the run-on sentences, the em-dash asides, and the
`AND / THERE / IT / FINALLY / CLICKED.` line stack.

Preserved structurally: the single `---` rule before the closing note, the bold
group names, the bulleted group list with its nested paragraphs, the inline code
spans in the "Some cute statistics" line, and the italicised
*Yes, it was something about our IIIT community*.

No section headings are added anywhere in the body.

### Housekeeping

- Move the 6.8 MB PDF out of the repository root once extraction is done. It is
  untracked and not covered by `.gitignore`, so a `git add -A` would commit it to
  the repo that Vercel builds. Move rather than delete.
- Bump `lastUpdated` in `src/components/Footer.jsx`. It is a hardcoded constant
  rendered on every page and nothing updates it automatically.

## Verification

There is no test suite and no test framework in this project. "Verified" means the
production build succeeds and the affected pages render. That is what will be
claimed — not that tests passed.

1. Confirm no dev server is running: `ss -ltnp | grep :3000`. Do not use
   `lsof -ti:3000`; it has reported this port free while `next-server` held it.
   Building while `npm run dev` runs replaces the chunks the dev server is
   serving and makes every page render unstyled with 404s on
   `/_next/static/chunks/*`.
2. `npm run build`.
3. Render `/articles/iiit-blog` — title appears once, body renders, all seven
   images load, the collage is two columns at `lg` and one column on mobile.
4. Render `/articles` — the IIIT blog card navigates to `/articles/iiit-blog`
   in the same tab, not to Notion.
5. Confirm both redacted images are illegible where redacted.

## Risks

**Static image imports inside MDX are unproven here.** No article in the repo
currently imports from `src/images/**` inside an `.mdx` file, so that path has
never executed in this project. The design avoids the riskier half of it — the
untested `Image` component mapping — by having `Figure` import `next/image`
itself, but the ESM import of a PNG from within MDX is still new ground. If it
fails, the fallback is to move the imports into `MdxFigure.jsx` and have the MDX
select an image by a string key instead.

**`src/images/` is root-owned** (`drwxrwxrwx root root`) from a past
`sudo npm install`. It is world-writable, so creating
`src/images/articles/iiit-blog/` and writing files into it will work. Deleting
those files later may fail with `Permission denied`, because removal needs write
access on the parent directory. Claude cannot `sudo`; if cleanup is ever needed,
the user runs
`sudo chown -R amnesia:amnesia "/home/amnesia/AMNESIA/Personal Website"`.

**Invalid HTML nesting is the recurring failure mode in this repo.** Recent
history is a run of `<p>`-inside-`<p>` hydration crashes. MDX generates paragraph
tags automatically, so block-level components placed mid-paragraph will nest
badly. `Figure` and `FigureGrid` must sit at the top level of the MDX, separated
by blank lines, never inline within a paragraph.

## As built — deviations from the design above

Four things changed during implementation. All are improvements on the design as
written; recorded here so the spec matches what shipped.

**1. WebP, not PNG, and downscaled.** The seven extracted PNGs totalled 6.0 MB,
which would have entered the repository permanently for one article. They are
capped at 1400 px wide and encoded WebP at quality 85, totalling **668 KB**.
Filenames are `.webp` rather than the `.png` named in the table above. Next.js
supports static ES-module imports of WebP, so nothing else changed.

**2. An eighth redaction, not in the brief.** `sell-airpods.webp` (PDF image 3)
carried an unredacted phone number, `+91 88846 16346`, on the quoted message. The
author's own blue-scribble pass had covered the sender names immediately beside
it but missed this. Found while building a contact sheet to confirm which
collage image was which. Now pixelated and blurred like the rest.

Profile photographs remain visible in the four collage images. Those screenshots
were redacted by the author, who chose to leave avatars in; that editorial
decision was left standing rather than silently widened.

**3. `Figure` sets a `sizes` hint.** Without one, `next/image` treats a static
import as fixed-size and emits a 1x/2x density `srcset`, so a retina client
fetches a much larger file than the 672 px column can use. `Figure` now defaults
to `sizes="(min-width: 672px) 672px, 100vw"`, overridable per call.

**4. The MDX default export takes `children` only.** This is the important one.

The Spotlight template's idiom is:

```jsx
export default (props) => <ArticleLayout article={article} {...props} />
```

In MDX a default export becomes the layout wrapper, and the compiled
`MDXContent` spreads the *page's* props into it — including `searchParams`.
`ArticleLayout` is a `'use client'` component, so forwarding `searchParams`
across the server/client boundary serializes a dynamic API and drops the route
out of static prerendering.

The first build produced `ƒ /articles/iiit-blog` while every other route was
`○`, breaking the site-wide invariant recorded in `CLAUDE.md` that the deployed
site is pure CDN output. Nothing errored — the page rendered correctly and would
simply have cost a serverless invocation on every request, visible only as one
character in the build table.

The shipped form, which builds `○`:

```jsx
export default ({ children }) => (
  <ArticleLayout article={article}>{children}</ArticleLayout>
)
```

**Any future article converted to render in-site must use this form.** The
template's idiom is a trap in this codebase.

## Out of scope

- Converting any other article stub. The four other articles keep their external
  `url` values and stay as they are.
- Restoring an RSS feed. It was removed deliberately.
- Any change to `next.config.mjs`. Its `outputFileTracingIncludes` entry for
  `/articles/*` already covers this file and must be left alone.
- The four-way duplicated CV Drive URL, and whether it points at a stale PDF.
  That is a real open issue, tracked in `CLAUDE.md`, and unrelated to this work.
