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

## Quality checks

```bash
npm test
```

This runs linting, creates a production static export, and verifies the Pages entry point and generated ecosystem snapshot.

## Data source

Library names, categories, repository links, and React-only flags come from [vault-developer/react-ecosystem-chart](https://github.com/vault-developer/react-ecosystem-chart). Stars, descriptions, push dates, and calculated activity labels are collected from the GitHub API during each build.
