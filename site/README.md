# OneSquad website

The site adapts [`dktunited/nextjs-template`](https://github.com/dktunited/nextjs-template) at revision `29a607e0146666f8af61d9de2950f7cdd6634b7e`: Next.js App Router, React, TypeScript, Tailwind CSS, official Vitamin Play fonts/tokens/icons, static export, and the documentation sidebar/article/table-of-contents layout. The template's demo blog, team pages, and example articles are intentionally not included.

The shared header follows the [AI Augmented Development portal](https://ai-augmented-development.decathlon.net/ai-augmented-sdlc): logo on the left, then search, a solid blue **Getting started** CTA with white text and a right-arrow icon, and **Docs, Community, Contribute** links on the right (in a dropdown on mobile). Docs uses the reference portal's open-book icon. Community opens the Google Space directly; Getting started opens `/docs/tutorials/getting-started/`.

## Local development

To build and launch the site with one command from the repository root:

```bash
./site/start.sh
```

Open <http://localhost:9000>. An optional argument selects another port, for example `./site/start.sh 8080`. The script works from any working directory, rebuilds the site before serving `site/out/`, and stops with Ctrl+C. Dependencies must already be installed using the setup below.

Use Node.js 24+ and npm. Private Vitamin Play packages require Google Artifact Registry access:

```bash
gcloud auth login
npm --prefix site run auth:registry
npm --prefix site ci
npm --prefix site run dev
```

Open <http://localhost:3000>. Credentials belong in the local user npm configuration, never in the repository. `site/.npmrc` contains only the registry scope; CI authenticates through the existing Decathlon action.

## Content and routes

Website articles remain in `site/docs/`, with their existing Markdown content and URLs:

```text
docs/
  tutorials/getting-started.md       → /docs/tutorials/getting-started/
  how-to/adopt-one-squad.md          → /docs/how-to/adopt-one-squad/
  explanation/delivery-workflow.md   → /docs/explanation/delivery-workflow/
  reference/repository-guide.md      → /docs/reference/repository-guide/
```

The internal repository `docs/` is separate and **never automatically published**. Links to files outside `site/docs/` open their repository source on GitHub.

Each website article needs `title` and `summary` in YAML frontmatter. Optional `website.order`, `website.slug`, and `website.category` are retained. The folder determines its category by default. Add or edit category labels in `lib/site.ts`.

Use relative Markdown links between articles. The renderer resolves those links to public routes and fails the build on unresolved local references. Keep article images beside their source; the preparation script copies non-Markdown assets to the generated `public/docs-assets/` directory. Markdown HTML stays escaped. Existing heading anchors, code highlighting, copy controls, tables, and cross-category previous/next navigation are preserved.

## Application structure

| Path | Purpose |
| --- | --- |
| `app/layout.tsx` | Shared header, global content search, breadcrumb, and footer |
| `app/components/` | Header actions, accessible search dialog with Cmd/Ctrl+K, and breadcrumbs |
| `app/page.tsx` | OneSquad project presentation |
| `app/docs/` | Documentation overview, category pages, statically generated articles, mobile navigation, and TOC |
| `app/globals.css` | Template Vitamin Play imports and OneSquad responsive styling |
| `lib/docs.ts` | Source loading, metadata validation, Markdown rendering, and link resolution |
| `public/assets/` | Original OneSquad branding and community images |
| `next.config.ts` | Static export configuration |

Search indexes the website articles' full content at build time and is available on every page without a server or external service. The browser's native dialog manages focus and Escape; all results are keyboard-accessible links.

## Production and checks

```bash
npm --prefix site run test:docs
npm --prefix site run build:docs
npm --prefix site run typecheck
npm --prefix site run test:export
npm --prefix site start
```

The production build exports to `site/out/`, which is ignored by Git. `start` serves that export on port 3000 using Python 3; it does not start a Next.js server. `.github/workflows/deploy-pages.yml` installs dependencies, checks articles, builds, verifies the export, and publishes **only `site/out/`**. The `build:docs` command is retained for compatibility.

The test suite checks metadata, existing URLs, local link rewriting, duplicate heading anchors, safe rendering, preserved Markdown sources, shared header actions, and exported local targets. Rebuild after changing articles or branding.
