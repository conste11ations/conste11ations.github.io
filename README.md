# conste11ations.github.io

Personal website built with Next.js, Tailwind CSS, and React. Hosted on GitHub Pages.

## Stack

- [Next.js](https://nextjs.org/) (pages router, static export)
- [Tailwind CSS](https://tailwindcss.com/) v3
- [React](https://react.dev/) 17
- [GitHub Pages](https://pages.github.com/)

## Local development

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying changes

Deployment is a two-step process: build a static export, then push it to the `gh-pages` branch.

### 1. Install dependencies (first time only)

```bash
yarn install
```

### 2. Build and export

```bash
yarn export
```

This runs `next build && next export`, producing a static site in the `out/` directory. A `.nojekyll` file is also created so GitHub Pages serves the files correctly.

### 3. Deploy to GitHub Pages

```bash
yarn deploy
```

This pushes the contents of `out/` to the `gh-pages` branch using [`gh-pages`](https://github.com/tschaub/gh-pages). GitHub Pages serves the site from that branch automatically.

The live site will update at **https://conste11ations.github.io** within a minute or two.

### One-liner

```bash
yarn export && yarn deploy
```

## Project structure

```
pages/          # Route pages (Next.js file-based routing)
components/     # Shared React components
public/         # Static assets (images, SVGs, video)
styles/         # Global CSS
```
