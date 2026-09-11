---
title: Deploy a project
description: Create a project, inspect its release, and switch traffic to your application.
sidebar:
  order: 4
---

Before deploying, [connect your repository](/guide/add-ssh-key/) and [prepare its build and start command](/guide/application-structure/).

## Create the project

Open the dashboard's projects list and select **Add Project**. In **Create New Project**, fill in:

| Field | What to enter |
| --- | --- |
| Project Name | A unique name such as `my-project`. Start with a letter or number; use letters, numbers, underscores, dots, or hyphens. Reserve `jakeloud` for the dashboard. |
| Repository | Your Git clone URL, for example `git@github.com:your-account/your-repository.git`. |
| Enable domain and proxy | Turn on for a website; leave off for a worker. |
| Domain | A hostname such as `app.example.com`, without a scheme, path, or port. Point its DNS at the server first. |
| Liveness timeout | Minutes before the new release is automatically promoted. The default is 5. |
| Use default command | Keep checked for a Dockerfile serving port 80, or uncheck to edit the command. |
| Build and start command | The shell command that builds and runs the application in the foreground. Jakeloud provides `$PORT`. |

Select **Create Project**, then open the project to inspect its status and logs. Creation starts a deployment; it does not mean the application is ready to serve traffic.

## Check the release and switch traffic

For a project with a domain, the new release enters **awaiting liveness** while its command runs. Use **Update status** to refresh **Status / Logs** and inspect the runtime details.

When you have checked that the application is ready, select **Confirm live and switch**. Jakeloud points Nginx at the new port, configures HTTPS, and stops older releases after successful promotion.

If you do not confirm manually, Jakeloud attempts promotion when the liveness timeout expires, provided the release process is still alive. The timer starts when the command launches, so it includes build time. Set it long enough for your build and startup.

:::caution[Process liveness is not an HTTP health check]
An alive process may still be building or unable to serve requests. Automatic promotion checks process liveness; it does not probe an application health endpoint. Inspect logs and verify readiness before confirming a release.
:::

A project without a domain skips the proxy, certificate, and liveness wait stages. Older releases are stopped as part of cleanup after its command starts.

## Deploy an update

Push your changes to the repository's default branch. Open the project, review the command, and select **Full Reboot**. This creates a fresh release using the repository and the selected command. It is a rebuild and redeploy, not just a restart of the existing process.

For a web project, repeat the readiness check and traffic switch. If the new release fails before switching, inspect its logs; do not assume a failed deployment has replaced the previously active release.

## Change a project domain or timeout

Open the settings icon beside the project domain (or **No domain**). Enter the hostname and **Timeout in minutes**, then select **Save and redeploy**. This starts a new deployment, using the command currently selected in the project view. Point the new hostname at your server before switching.

This editor can add a domain to a worker or change an existing hostname and delay. It requires a hostname; disabling the domain is available through the API rather than this editor.

For details on candidate and active processes, retained logs, and failure recovery, see [understand releases](/guide/releases/).

## Delete a project

Select **Delete Project** and confirm the dialog to stop its releases and remove its project directory and Nginx site files. Back up any data stored in that directory first. Manage external volumes and databases separately.

For deployment from a coding assistant, see [agent setup](/guide/agents/).
