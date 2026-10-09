---
title: What is Jakeloud?
description: Deploy repositories, run workers, and manage releases on your own server.
sidebar:
  order: 0
---

Jakeloud runs on a single Linux server and provides a web dashboard for deploying Git repositories.

- **Commands:** use the default Docker build and run steps, or supply ordered shell commands for your runtime.
- **Domains:** serve one application on several hostnames with Nginx and Certbot-managed HTTPS.
- **Workers:** run a foreground process without a domain or proxy.
- **Releases:** each deployment gets a numbered checkout, assigned port, tracked process, and log.
- **Deployment:** web releases switch traffic automatically after the final command stays alive for five seconds. Older processes stop after proxy and certificate setup succeeds.
- **Agents:** the [Jakeloud skill](/guide/agents/) lists projects, reads status and logs, and redeploys saved projects.
- **API:** the [HTTP API](/guide/api/) provides project creation, status, deletion, and dashboard domain settings.

The service runs as root. Accounts share access to projects, so use it for trusted operators and trusted code. Server capacity, installed runtimes, backups, and application data are managed by you.

Start with [installation](/guide/), then [prepare your application](/guide/application-structure/) and [deploy a project](/guide/create-application/).
