# JFG Modding Wiki

The modding wiki for **Jet Force Gemini: Recompiled**, served at <https://jfg.vibintoast.com>. Built with
[Nextra](https://nextra.site) (Next.js) as a static site and published by GitHub Pages.

## Edit a page

Pages are Markdown with components (MDX) in `content/`. Each folder's `_meta.ts` sets the sidebar order and titles.
Screenshots go in `public/img/`.

Components every page can use without importing:

| Component | For |
|---|---|
| `<Status s="built" />` (`partial`, `planned`) | How far a feature is |
| `<Legend />` | The three statuses explained |
| `<Figure src="/img/x.png" alt="..." caption="..." />` | A screenshot with a caption |
| `<Callout type="info">` (`warning`, `error`) | A note |
| `<Steps>` with `###` headings inside | A numbered walk-through |
| `<Cards>` / `<Cards.Card title href arrow />` | Link cards |

## Run it locally

```
npm install
npm run dev        # http://localhost:3100
npm run build      # the static site in out/, with the search index
```

## Publish

Every push to `main` builds the site and publishes it (`.github/workflows/deploy.yml`). One-time setup:

1. GitHub: Settings > Pages > Source **GitHub Actions**; custom domain `jfg.vibintoast.com`; Enforce HTTPS once the
   certificate is ready.
2. DNS (Porkbun): a `CNAME` record, host `jfg`, answer `vibintoast.github.io`.

## Rules for content

- Nothing from the game: no ROM data, no exported models, textures or tracks. Screenshots show Studio and the example
  world's own geometry only.
- `zod` is pinned to 4.1.12 in `package.json` (`overrides`): newer 4.x versions break Nextra 4.6's layout validation.
