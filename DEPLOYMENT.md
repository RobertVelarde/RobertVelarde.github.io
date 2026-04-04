# Deployment Guide

This React portfolio is built with Vite and deployed to GitHub Pages.

## Prerequisites

- Node.js 18+ and npm
- A GitHub repository named `<username>.github.io`

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to preview.

## Build

```bash
npm run build
```

Output is written to `dist/`. Preview the production build with:

```bash
npm run preview
```

## Deploy to GitHub Pages

### Option A: Deploy from a `dev` branch (recommended)

1. Create a `dev` branch for source code:
   ```bash
   git checkout -b dev
   git add .
   git commit -m "Initial portfolio source"
   git push -u origin dev
   ```

2. Deploy the built site to `main`:
   ```bash
   npm run deploy
   ```
   This runs `vite build` then pushes the `dist/` contents to the `main` branch via `gh-pages`.

3. In GitHub repo Settings > Pages, set the source to **Deploy from a branch** and select **main** / **/ (root)**.

4. Set the default branch to `dev` in Settings > General so future PRs target `dev`.

### Option B: GitHub Actions (alternative)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [dev]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          publish_branch: main
```

## Custom Domain

The `CNAME` file in `public/` is automatically included in the build output. To use a custom domain:

1. Add your domain to `public/CNAME` (currently set).
2. Configure your DNS provider with an A record pointing to GitHub's IPs or a CNAME pointing to `<username>.github.io`.
3. Enable HTTPS in GitHub repo Settings > Pages.

## Contact Form Setup (Formspree)

1. Create a free account at [formspree.io](https://formspree.io).
2. Create a new form and copy the form ID.
3. In `src/data/siteData.js`, replace `YOUR_FORM_ID` in the `formspreeEndpoint`:
   ```js
   formspreeEndpoint: "https://formspree.io/f/YOUR_ACTUAL_FORM_ID",
   ```
4. Rebuild and redeploy.

## Updating Content

All site content is centralized in `src/data/siteData.js`. Edit this file to update:

- Hero section (name, headline, tagline, social links)
- Experience entries
- Project descriptions and links
- Skills categories
- Contact form configuration

After editing, run `npm run deploy` to push changes live.
