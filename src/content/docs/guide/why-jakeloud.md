---
title: What the new Jakeloud offers
description: Command-based deployments, controlled release switching, and automation on your own server.
sidebar:
  order: 0
---

Jakeloud brings repository deployment, process tracking, HTTPS routing, and agent access together on your own server. The new `jl` implementation makes the build and start command the center of a project, giving you more control over how applications run and when new releases receive traffic.

## Use the runtime your project needs

Keep the default Docker build-and-run command for a conventional container deployment, or supply your own shell command. You can run a native Node.js service, build a Go binary, or use Podman if it is installed on the host. Jakeloud runs the command from a fresh release checkout and supplies `$PORT`.

That means a Dockerfile is optional when you use a custom command. Build tools and runtimes are your choice, and a saved command can be reused from the dashboard or an agent. See [application commands](/guide/application-structure/).

## Prepare a release while the previous one serves traffic

A full reboot creates a numbered release and assigns a new port. For a project with a domain, the previous active process can continue serving while the candidate builds and starts.

Inspect its logs and select **Confirm live and switch** when ready, or use the configurable automatic-switch timer. Once proxy and certificate setup succeed, Jakeloud stops older releases. This separates starting an application from sending users to it.

If proxy or certificate setup fails during promotion, Jakeloud attempts to restore the proxy target to an older active release that is still alive. This is recovery during a failed switch, not a general release rollback button. Nginx is restarted during configuration, so this is not a guarantee of zero downtime. See [release behavior](/guide/releases/).

## Run workers alongside websites

A domain is optional. Use a project without a domain for a queue consumer, bot, or other long-running background service. It uses the same repository, command, logs, and process tracking, while skipping Nginx and certificate setup.

For websites, Jakeloud handles the assigned port, Nginx configuration, and Certbot certificate request. The generated proxy configuration also includes WebSocket upgrade headers and a 100 MB request-body limit.

## See what is actually running

The project view shows the release number, assigned port, process ID, runtime role, and recent logs. **Candidate** identifies a living process that has not become active; **Active** identifies a promoted release. An unexpected process exit is recorded as a release error.

Per-release log files help investigate build and runtime failures without depending only on the latest dashboard message. Optional Telegram notifications report deployment starts and release failures, so you can hear about a problem outside the dashboard.

## Deploy from your agent or your own tools

The [Jakeloud skill](/guide/agents/) lets coding agents list projects, inspect status and logs, and request a full reboot with your confirmation. It uses the existing HTTP API, with no extra server-side agent service or MCP installation.

The same [API](/guide/api/) exposes project creation, deletion, and liveness confirmation for your own integrations. A Git push alone does not trigger a deployment: start one through the dashboard, skill, or API.

## Keep the platform on your server

The Go executable embeds the dashboard and runs under systemd. Configuration lives in `/app/conf.json`, release checkouts and logs live under `/app`, and Nginx serves your domains. You can inspect and back up these files using ordinary server tools.

This suits a personal server or a trusted team's shared deployment host. It does not provide per-project tenant isolation, multi-server scheduling, managed databases, or automatic application scaling. Capacity and build performance depend on the server and workloads you choose.

## Coming from the old Jakeloud

| Earlier workflow described in these docs | Current `jl` workflow |
| --- | --- |
| Root Dockerfile and a Docker Options field | Default Docker command or a complete custom build and start command |
| Domain entered for each app | Optional domain, with a configurable promotion delay for web apps |
| Full reboot as the main deployment action | Numbered releases, candidate/active process roles, and manual or timed traffic switching |
| Dashboard-centered operations | Dashboard, HTTP API, and the separately installed agent skill |
| Shell installer from the old repository | Release binary with embedded dashboard and systemd setup |

The guides follow the [current source](https://github.com/jakeloud/jl). Published binaries and older running instances can have different controls. Use [installation](/guide/) for a new server and [maintenance](/guide/operations/) for updates and migration considerations.
