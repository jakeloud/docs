---
title: Settings and maintenance
description: Inspect service logs, update Jakeloud, build from source, and troubleshoot deployments.
sidebar:
  order: 6
---

Settings contains the server's **SSH Key** and the dashboard's domain list. See [repository access](/guide/add-ssh-key/) and [dashboard domains](/guide/#set-dashboard-domains).

## Inspect the service

On the server:

```bash
sudo systemctl status jakeloud
sudo journalctl -u jakeloud -n 100 --no-pager
```

For application output, select a project's **…** button, then **Update status**, or use the [agent skill](/guide/agents/). Full logs live in `/app/<project>/r<number>.log`.

## Backups

Back up `/app`, which contains `conf.json`, the server SSH key pair, release checkouts, and logs. Also back up application volumes, databases, Nginx configuration, and certificates as needed. Keep durable application data outside release directories.

## Update Jakeloud

Back up the server's configuration and application data. Download the replacement into a separate directory, then stop the service before running the installer:

```bash
curl -fL https://github.com/jakeloud/jl/releases/download/v%JAKELOUD_VERSION%/jl -o jl
chmod +x jl
sudo systemctl stop jakeloud
sudo ./jl
sudo systemctl status jakeloud
```

Stopping the service stops tracked release processes. Startup redeploys saved projects from their repositories, so allow for application downtime and newer repository contents.

## Build from source

With Docker installed:

```bash
git clone https://github.com/jakeloud/jl.git
cd jl
docker build --tag=jl --file=build.Dockerfile .
docker create --name jlc jl
docker cp jlc:/app/jl ./jl
docker rm jlc
```

The build embeds the dashboard and produces a Linux executable for the builder's architecture. Build for the target server, copy `jl` there, and use the installation or update commands.

## Troubleshooting

| Problem | Check |
| --- | --- |
| Dashboard unavailable | Systemd journal, DNS, Nginx configuration, and inbound ports 80/443. |
| Clone fails | Repository URL and the instance's SSH key access. |
| Command or runtime not found | Host tools and the service PATH; use an absolute executable path if needed. |
| Release exits | Preparation-step errors and final-process output in the release log. |
| Domain returns a gateway error | App startup and listening port; Docker must map `$PORT` to its HTTP port. |
| TLS setup fails | Every configured hostname must resolve to this server and support certificate validation. |
| Skill reports version mismatch | [Check the installed skill and reported instance versions](/guide/agents/#check-versions). |

## Users and access

Accounts share project access. The first registered account owns the dashboard. There is no registration toggle in Settings; registration is accepted for the first user or when the dashboard record's `additional.allowRegister` is true. Treat accounts as trusted server operators.
