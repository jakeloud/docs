---
title: Set up your coding agent
description: Install and configure the Jakeloud skill to list projects, read logs, and redeploy.
sidebar:
  order: 5
---

The [Jakeloud skill](https://github.com/jakeloud/skill) lets your agent list projects, read status and logs, and redeploy saved projects through the HTTP API. Create projects in the dashboard first.

## Install the skill

On the computer where your agent runs:

```bash
npx skills add jakeloud/skill
```

For a global installation in Codex and OpenCode:

```bash
npx skills add jakeloud/skill -g -a codex -a opencode
```

The skill also supports Claude Code, Cursor, and other agents using the Agent Skills format. For manual installation, copy the repository's `skills/jakeloud` directory into your agent's skills directory. Restart your agent after installation.

## Configure your instance

The client needs **Bash 3.2+**, **curl**, and **jq**. Installation with `npx` also needs Node.js/npm.

Run configuration in your own terminal. For global Codex:

```bash
bash ~/.codex/skills/jakeloud/scripts/jakeloud.sh configure
```

For global OpenCode:

```bash
bash ~/.config/opencode/skills/jakeloud/scripts/jakeloud.sh configure
```

For another installation, use its `jakeloud/scripts/jakeloud.sh` path.

Enter your instance URL, email, and password. Password input is hidden. The client stores credentials in `${XDG_CONFIG_HOME:-$HOME/.config}/jakeloud/config.json`, with directory mode `0700` and file mode `0600`. Keep the file private and configure it where the agent runs.

Remote URLs require HTTPS. Plain HTTP is accepted for `localhost`, `127.0.0.1`, and `[::1]`. For a trusted private HTTP service, run `configure --allow-http`.

## Check versions

For global Codex:

```bash
bash ~/.codex/skills/jakeloud/scripts/jakeloud.sh --version
bash ~/.codex/skills/jakeloud/scripts/jakeloud.sh check-version --json
```

The skill currently uses version **0.2.0**, which must exactly match the instance's reported version. This is separate from the downloadable binary's release tag, **v%JAKELOUD_VERSION%**.

Every project command checks the version first. A different or missing version blocks project listing, status, and reboot. The server reports the version stored in its `jakeloud` configuration record, which can remain unchanged across binary upgrades.

To update an installation managed by the Skills CLI:

```bash
npx skills update jakeloud
```

Use the skill matching the instance's reported version and API. For a manual installation, replace the installed skill directory with the matching upstream directory. Restart the agent and retry the version check.

## List and inspect projects

```bash
bash ~/.codex/skills/jakeloud/scripts/jakeloud.sh projects
bash ~/.codex/skills/jakeloud/scripts/jakeloud.sh status my-project
```

Use a project name returned by `projects`. Add `--json` for machine-readable output. Use your installed script path for other agents.

Example agent requests:

- “Use Jakeloud to list my projects.”
- “Check my-project's status and show recent errors.”
- “Redeploy my-project using its saved settings.”

## Redeploy

The skill checks status before rebooting. A full reboot clones the saved repository and runs the saved ordered commands, preserving all configured domains. The agent needs your explicit authorization for that reboot.

```bash
bash ~/.codex/skills/jakeloud/scripts/jakeloud.sh reboot my-project --yes
```

`--yes` is required. An accepted request means deployment was requested; inspect `status my-project` again to check progress. Web releases switch traffic automatically after the startup check and proxy setup.

## Troubleshooting

| Problem | Check |
| --- | --- |
| Skill not found | Installation path and agent restart. |
| Missing `jq` or `curl` | Install it in the agent's execution environment. |
| Authentication fails | Dashboard login, then rerun `configure`. |
| Version mismatch | Installed skill version, reported instance version, and matching API. |
| Connection fails | Base URL, DNS, network access, and TLS certificate. |
| Project not found | Exact name from `projects`. |
| Rebooted app unavailable | Project status, release logs, listening port, and DNS. |
