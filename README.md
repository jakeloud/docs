# Jakeloud documentation

Documentation for [jakeloud/jl](https://github.com/jakeloud/jl), published at [jakeloud.com](https://jakeloud.com). Built with Astro and Starlight.

## Local development

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The static site is generated in `_site/`. The repository's Dockerfile serves that output with Nginx.

## Editing

Pages live in `src/content/docs/`. The guide sidebar is generated from frontmatter order values. Navigation and redirects are configured in `astro.config.mjs`.

To update the release used in download commands, change `JAKELOUD_VERSION` in `src/constants.mjs` (without the `v` prefix), then run `npm run build`. Pages use `%JAKELOUD_VERSION%` in prose, links, code blocks, and code block titles; the build replaces it with the shared version.

Follow [AGENTS.md](AGENTS.md) for upstream verification, screenshot collection, and the documentation update workflow.
