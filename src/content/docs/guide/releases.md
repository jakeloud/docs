---
title: Understand releases
description: Follow candidate and active processes, inspect logs, and understand promotion and recovery.
sidebar:
  order: 7
---

A project stores the repository, domain, and command. A release is one checkout and execution of that command. **Full Reboot** starts a new release from the repository's default branch.

## Follow a web deployment

1. Jakeloud assigns a port and creates the next numbered directory, such as `/app/my-project/r3`.
2. It clones the repository and starts the command with `$PORT` set to the assigned port.
3. The release enters **awaiting liveness**. Its process is a candidate; the existing active release can keep serving the domain.
4. **Confirm live and switch**, or expiration of the timeout, starts promotion if the candidate is still alive.
5. Jakeloud configures Nginx and the certificate, stops older processes, and marks the new release active.

The timeout begins when the command starts, including build time. It is a delay before promotion, not an HTTP readiness probe. Choose a delay that accommodates your build, or inspect readiness before confirming manually.

For a worker without a domain, startup skips the promotion wait and proceeds to cleanup. Be prepared for a short overlap between worker processes.

## Read the project details

| Field | Meaning |
| --- | --- |
| State | The latest release's deployment stage or error. |
| Port | The assigned port for the latest deployment. |
| Release | The newest numbered checkout, which may still be a candidate or may have failed. |
| Process | The tracked process ID, when available. |
| Role | Active, Candidate, or Inactive according to process liveness and promotion. |
| Automatic switch | The candidate's promotion deadline. |

Use **Update status** to refresh these details and the logs. The newest release is not necessarily the one currently serving the domain: a failed candidate can coexist with an older active process.

To check an HTTP candidate from the server, substitute its displayed port and an endpoint your app serves:

```bash
curl --fail http://127.0.0.1:38000/health
```

The port above is only an example; Jakeloud allocates ports starting at 38000 and skips those recorded for projects or tracked releases. It does not reserve ports used by unrelated host services. Use the assigned port instead of hard-coding one in your command.

## Logs and retained files

Release checkouts use `/app/<project>/r<number>`. Logs sit alongside them as `/app/<project>/r<number>.log` and include clone/build/start output. For example:

```bash
sudo tail -n 100 /app/my-project/r3.log
```

On creation of a new checkout, Jakeloud retains that directory and the immediately preceding numbered directory, removing older checkout directories. This does not guarantee retention of the last successful release. Log files are separate and are not removed by that checkout pruning; monitor disk usage and archive logs as needed.

## Failures and shutdown

An unexpected process exit records an error and can send a Telegram notification. If promotion fails during proxy or certificate setup, Jakeloud attempts to restore the previous proxy target when an older active process remains alive. Inspect the error and service logs; recovery itself can fail.

There is no automatic HTTP health monitoring or general rollback control. Fix the code or configuration, push the intended version to the default branch, then start another full reboot.

Jakeloud sends termination signals to tracked process groups when stopping old releases or shutting down. Write applications to handle termination and keep the command in the foreground. Restarting the Jakeloud service redeploys saved projects; it is not a transparent restart of the dashboard alone.
