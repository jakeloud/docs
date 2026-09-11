---
title: Set up your coding agent
description: Install the Jakeloud agent skill, configure credentials, and inspect or redeploy existing projects.
sidebar:
  order: 5
---

The [Jakeloud agent skill](https://github.com/jakeloud/skill) connects your coding agent to an existing Jakeloud instance. It can list projects, read a project's deployment status and recent logs, and start a full reboot using its saved repository, domain, and command.

It uses Jakeloud's existing HTTP API. You do not need an MCP server or a server-side plugin. Create projects in the dashboard first; the skill's client does not provide project creation or deletion commands.

## Install the skill

On the computer where your agent runs, install the skill with:

```bash
npx skills add jakeloud/skill
```

Follow the installer to choose your agent. To install globally for both Codex and OpenCode:

```bash
npx skills add jakeloud/skill -g -a codex -a opencode
```

The repository also supports agents that understand the Agent Skills format, including Claude Code and Cursor. For a manual installation, copy the repository's `skills/jakeloud` directory into your agent's skills directory.

Restart a running agent after installation so it discovers the skill.

## Configure your instance

The bundled client requires **Bash 3.2 or newer**, **curl**, and **jq**. The `npx` installation command also requires a working Node.js/npm installation.

Run configuration in your own terminal. For a global Codex installation:

```bash
bash ~/.codex/skills/jakeloud/scripts/jakeloud.sh configure
```

For a global OpenCode installation:

```bash
bash ~/.config/opencode/skills/jakeloud/scripts/jakeloud.sh configure
```

For another installation location, run `scripts/jakeloud.sh` from the installed `jakeloud` skill directory.

Enter your instance's base URL, such as `https://jl.example.com`, followed by your Jakeloud email and password. Password input is hidden. Use the same account you use in the dashboard.

Configuration is stored in `${XDG_CONFIG_HOME:-$HOME/.config}/jakeloud/config.json`. The client creates the directory with mode `0700` and the file with mode `0600`. This file contains credentials; keep it out of repositories and shared logs. Configure it in the environment where the agent actually runs.

Remote instances require HTTPS by default. Plain HTTP is accepted for `localhost`, `127.0.0.1`, and `[::1]`. For a trusted private service that requires HTTP, configuration supports `configure --allow-http`.

## Verify the connection

For Codex's global installation, run:

```bash
bash ~/.codex/skills/jakeloud/scripts/jakeloud.sh projects
bash ~/.codex/skills/jakeloud/scripts/jakeloud.sh status my-project
```

Replace `my-project` with a name returned by the first command. For OpenCode or another agent, use its installed script path. Add `--json` to either command for machine-readable output.

## Ask your agent to use Jakeloud

Example requests:

- “Use the Jakeloud skill to list my projects.”
- “Check my-project's deployment status and show the recent errors.”
- “Review my-project's saved deployment settings before rebooting it.”

A full reboot deploys from the saved repository again, using the saved domain and command. The skill instructs agents to obtain explicit confirmation before running a reboot. After you confirm, the client invocation is:

```bash
bash ~/.codex/skills/jakeloud/scripts/jakeloud.sh reboot my-project --yes
```

The `--yes` flag is required. A successful reboot request means deployment has started; check `status my-project` again to follow the release. For a web project, use the dashboard's **Confirm live and switch** control once ready, or let the configured timeout promote it. The skill does not expose a liveness-confirmation command.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| The agent cannot find the skill | Restart the agent and verify the installation location for that agent. |
| `jq` or `curl` is missing | Install the missing command in the agent's execution environment. |
| Authentication fails | Log into the dashboard with the same account, then rerun `configure`. |
| Connection or TLS failure | Check the base URL, DNS, network access, and the instance's certificate. |
| Project not found | Run `projects` and copy the exact project name. |
| Reboot requested but app unavailable | Inspect `status`, release logs, and the domain's promotion state. |

See the [skill README](https://github.com/jakeloud/skill#readme) for the client's full usage and configuration details.
