---
title: Settings and maintenance
description: Inspect the service, configure notifications, update Jakeloud, and troubleshoot deployments.
sidebar:
  order: 6
---

## Inspect the service

On the server:

```bash
sudo systemctl status jakeloud
sudo journalctl -u jakeloud -n 100 --no-pager
```

For application output, open a project and use **Update status** under **Status / Logs**, or ask your [agent](/guide/agents/) for its status. The API returns up to the last 64 KiB of the current release's log.

Jakeloud keeps configuration and project data under `/app`, including `/app/conf.json` and its SSH key pair. Back up this directory along with your applications' external data and server configuration.

## Telegram notifications

The dashboard owner can open **Settings → Telegram Integration**, enter a **Chat ID** and **Bot Token**, and select **Update Telegram Settings**. The backend uses these settings for deployment-start, release-failure, and cache-clearing notifications. Treat the bot token as a secret.

## Clear Docker cache

**Settings → Docker Cache → Clear Cache** runs `docker system prune -af` on the server. This affects unused Docker resources across the host, including stopped containers, unused images, networks, and build cache. It can make subsequent builds slower. Review what else uses Docker on the host before running it.

## Update Jakeloud

Back up `/app` and application data, and download the replacement binary into a separate directory. Stop the service before running the new installer:

```bash
sudo systemctl stop jakeloud
chmod +x jl
sudo ./jl
sudo systemctl status jakeloud
```

Stopping Jakeloud stops its tracked release processes. On startup it redeploys saved projects from their repositories. Plan for this to affect running applications and to fetch newer repository contents.

## Build from source

To build the current source with Docker:

```bash
git clone https://github.com/jakeloud/jl.git
cd jl
docker build --tag=jl --file=build.Dockerfile .
docker create --name jlc jl
docker cp jlc:/app/jl ./jl
docker rm jlc
```

The build includes the frontend and produces a Linux executable. Build for the target server's architecture. Copy the resulting `jl` to the server, then follow the installation or update steps above.

## Common deployment problems

| Problem | Where to look |
| --- | --- |
| Dashboard never becomes available | Check the systemd journal, public DNS, Nginx configuration, and inbound ports 80/443. |
| Clone fails | Check the repository URL and the instance's SSH key access. |
| `docker: not found` or runtime missing | Install the tools used by the project's command on the server. |
| Release exits immediately | Keep its command in the foreground; inspect the release log for build or startup errors. |
| Domain returns a gateway error | Verify that the application listens on the assigned `$PORT`, or that Docker maps it to the correct container port. |
| Release is awaiting liveness | Verify readiness, then confirm it in the dashboard or wait for the configured timeout. |
| TLS setup fails | Check that the hostname resolves to this server and that certificate validation can reach Nginx. |

## Users and access

The first registered user owns the dashboard. The current Settings screen has no registration toggle. The backend retains an `allowRegister` setting, but Jakeloud does not provide isolated project permissions: authenticated users can operate on shared projects. Treat accounts as trusted server operators.

These instructions cover [jakeloud/jl](https://github.com/jakeloud/jl). An older installation from `jakeloud/jakeloud` uses a different deployment model; do not assume that replacing its binary or copying its configuration is a supported migration. Back up the old instance and recreate and verify projects on a separate new installation.
