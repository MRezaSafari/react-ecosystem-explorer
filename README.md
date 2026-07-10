# React Ecosystem Explorer

An interactive, searchable map of the React ecosystem, based on the data curated in [vault-developer/react-ecosystem-chart](https://github.com/vault-developer/react-ecosystem-chart).

## Live site

[mrezasafari.github.io/react-ecosystem-explorer](https://mrezasafari.github.io/react-ecosystem-explorer/)

## Features

- Constellation-style library explorer
- Search by library, category, or repository
- Category, React scope, and activity filters
- Shareable URLs that preserve the current view
- In-page library details with GitHub metadata
- Daily data refresh through GitHub Actions
- Bundled fallback data when GitHub is unavailable during a build
- Responsive layout and reduced-motion support

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

The development server uses the bundled fallback immediately and loads the generated snapshot when available.

## Production build

```bash
npm run build
```

The build refreshes the ecosystem data first, then writes a completely static site to `out/`.

To test the repository sub-path locally:

```bash
PAGES_BASE_PATH=/react-ecosystem-explorer npm run build
```

## GitHub Pages deployment

The included workflow at `.github/workflows/deploy-pages.yml`:

1. Refreshes repository metadata during the build.
2. Exports the app as static HTML, CSS, JavaScript, and JSON.
3. Applies the `/react-ecosystem-explorer` base path.
4. Deploys the `out/` directory to GitHub Pages.
5. Rebuilds every day at 02:17 UTC so activity and star data stay current.

After pushing the workflow, open **Settings → Pages** in the repository and set **Source** to **GitHub Actions**. You can also run the deployment manually from the **Actions** tab.

## Quality checks

```bash
npm test
```

This runs linting, creates a production static export, and verifies the Pages entry point and generated ecosystem snapshot.

## Data source

Library names, categories, repository links, and React-only flags come from [vault-developer/react-ecosystem-chart](https://github.com/vault-developer/react-ecosystem-chart). Stars, descriptions, push dates, and calculated activity labels are collected from the GitHub API during each build.
