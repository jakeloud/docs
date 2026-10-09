# Jakeloud documentation

## Scope and style

- Describe the current product directly: what it does, its fields, commands, and actual behavior.
- Keep pages concise. Do not add migration guides, previous-version comparisons, changelogs, marketing claims, or speculative features.
- Use exact dashboard labels and API field names. Include limitations only where they affect a documented action.
- Preserve established page paths, useful anchors, sidebar order, redirects, styling, and working examples. Update the relevant page instead of creating a competing guide. Keep implementation/update notes here, outside product pages.
- Inspect `git status` first and preserve unrelated user changes. Do not deploy, reboot a live project, change server settings, or publish merely to update documentation.

## Upstream sources

- Product: https://github.com/jakeloud/jl
- Agent skill: https://github.com/jakeloud/skill

For each update, fetch both repositories' current default branches into temporary clones outside this repository. Record full commit IDs and the latest published release; never infer a release from a README example. Reuse clean temporary clones with `git fetch` when available. Compare changes since the recorded baseline to locate affected pages, then read the complete relevant implementation.

Source map:

| Documentation | Verify against |
| --- | --- |
| Installation and maintenance | `jl/README.md`, `setup/`, `main.go`, `build.Dockerfile`, published release metadata and binary architecture |
| Dashboard fields and actions | `vite-app/src/components/`, `vite-app/src/lib/projects.ts`, `vite-app/src/types.ts` |
| Commands, ports, releases, logs, proxy, certificates | `entities/entities.go`, `entities/release_process.go`, `entities/domain.go` |
| HTTP API and account access | `api/index.go` and the operation handlers |
| Agent installation and behavior | `skill/README.md`, `skills/jakeloud/SKILL.md`, `VERSION`, `scripts/jakeloud.sh`, `references/api.md` |

Use implementation as the authority when prose is stale. Check the latest release tag against the default branch for documented behavior; do not silently combine an unreleased UI/API with released installation commands. If they differ, use a consistent documented target and explain the source-build requirement where needed. Record the discrepancy here rather than adding a comparison page.

## Update workflow

1. Check both upstream revisions and latest release using `git ls-remote`/`git fetch` and GitHub's releases API. Inspect diffs from the baseline below, then read affected source.
2. Audit all pages in `src/content/docs/` for changed fields, labels, commands, lifecycle behavior, API operations, and skill requirements. Remove obsolete instructions everywhere, including the homepage and image captions.
3. Update the release number only in `src/constants.mjs`, without `v`. Download examples use `%JAKELOUD_VERSION%`; `src/plugins/remark-jakeloud-version.mjs` replaces it in text, links, and code during the build.
4. Treat the release tag, server-reported version, and skill `VERSION` as separate values. Check how the server reports its version and how the skill validates it; do not assume a binary upgrade changes persisted configuration.
5. Capture screenshots for changed or useful UI controls, following the rules below. Replace page image references with matching captures. Keep useful source assets; do not remove an image without checking every reference. Historical captures must not illustrate current controls.
6. Run `npm ci` when dependencies are missing, then `npm run build`. Do not update dependency versions or the lockfile as part of a content refresh unless required to complete the build.
7. Check the generated `_site/` for unresolved `%JAKELOUD_VERSION%`, incorrect release links, missing images, broken internal paths, and fragment links whose IDs do not exist. Review the homepage and changed guides in a local preview (`npm run preview -- --host 127.0.0.1`). Inspect screenshots at their rendered size and check for clipped controls or horizontal overflow.
8. Run `git diff --check`, review the final diff and status, then update the baseline and screenshot provenance below. Report the changed documentation and validation; mention a concrete screenshot blocker if capture was impossible.

## Screenshot collection

- Prefer an already-open, authenticated Jakeloud dashboard. Compare visible controls with the documented upstream UI before using it.
- Capture actual UI with browser tooling. Never invent controls or present a mock as a running deployment. If only a local frontend with fixture data is available, label that provenance explicitly.
- Viewing projects, refreshing status, opening Settings, and filling an unsubmitted example form are sufficient. Do not create/delete projects, reboot, save domains, or change credentials for screenshots. Cancel drafts and restore the original tab view afterward.
- Use placeholder repository/domain values in unsubmitted examples. Crop to relevant cards so unrelated projects, logs, private repository names, and credentials stay out of documentation. A public SSH key can illustrate its copy control; never capture a private key or token.
- Save browser screenshots using their actual format (the current browser tool produces JPEG) under `src/assets/jl-*.jpg`. Use descriptive alt text and relative image paths in pages. The shared CSS frames `jl-` images in both themes.
- To crop a card, inspect its DOM bounding rectangle and capture with `fullPage: true` and `clip`. Convert viewport coordinates to page coordinates by adding scroll offsets. Verify the saved result visually; viewport crops can omit controls on scrolled pages.
- Keep capture metadata here: date, source URL or local setup, visible UI match, any sample input, and filenames. Do not claim a running binary version solely from its UI; verify the binary separately if needed.

## Last verified baseline

Updated 2026-10-09:

- `jakeloud/jl` main: `a033887fce3826d5cbc66dfec0567528da4cd3a9`.
- Published release: `v2.1.2`, tag commit `a831d88945604651e8df0c023564663370207293`. The subsequent main commit changes README download prose; documented backend, frontend, and setup behavior match the release tag.
- Published `jl` asset inspected as a Linux x86-64 ELF executable.
- Server source version: `0.2.0`. It is stored on the `jakeloud` project and filled only when missing, so the reported version can persist across upgrades.
- `jakeloud/skill` main: `a481b6c1f43397db29ed2686f05f103187534875`; skill `VERSION`: `0.2.0`. The client requires an exact match with the reported server version before project commands.

Screenshots captured on 2026-10-09 from the existing authenticated dashboard at `https://j2.amatrosov.com/`. Visible domain lists, ordered commands, project controls, and Settings match the documented upstream UI. The live executable was not independently version-checked. No deployment or server setting was changed.

- `jl-create-project.jpg`: unsubmitted example with `my-project`, placeholder repository URL, two example domains, and default Docker steps; canceled after capture.
- `jl-project-card.jpg`: only the public documentation project's card.
- `jl-project-commands.jpg`: public documentation project's active release and ordered commands, after a read-only status refresh; excludes the logs panel.
- `jl-ssh-key.jpg`: SSH Key card and copy control, public key only.
- `jl-dashboard-domains.jpg`: dashboard hostname list and save controls, viewed without changes.

Validation: production build passed; generated page links, anchors, assets, redirects, and release substitution checked; changed guides reviewed in the local browser with no page overflow or missing images. Dark and light themes inspected.
