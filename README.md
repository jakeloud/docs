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

Verify behavior against the [application source](https://github.com/jakeloud/jl) and the [agent skill](https://github.com/jakeloud/skill) when updating instructions. This rewrite was checked against jl commit `6f0d26d` and skill commit `d87981c`; the release installation example uses `v2.0.0`. Current source and published binaries can differ.

The old guide URLs remain in use. Experimental URLs redirect to maintenance guidance. `/install` and `/install-all` now lead to installation documentation; they no longer serve the old shell installers.
