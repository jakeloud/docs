---
title: HTTP API
description: Integrate project operations and release confirmation with your own tools.
sidebar:
  order: 8
---

The dashboard and agent skill send JSON requests to `POST https://<your-instance>/api`. The `op` field selects an operation. Authenticated requests include `email` and `password` in the JSON body; there is no separate API-token setup in this implementation.

For routine project listing, status, and reboot automation, prefer the [agent skill's client](/guide/agents/). It handles configuration and checks authentication responses.

## Project operations

| `op` | Additional request fields | Behavior |
| --- | --- | --- |
| `getConfOp` | None | Returns configuration, including the `apps` project list. Treat this response as sensitive server configuration. |
| `getAppOp` | `name` | Returns a project with runtime information and recent release logs. |
| `createAppOp` | `name`, `repo`, `domain`, `additional.cmd` | Creates a project or starts a new deployment of an existing name. |
| `confirmAppLivenessOp` | `name`, `release` | Promotes the specified living candidate that is awaiting liveness. |
| `deleteAppOp` | `name` | Stops releases and removes the project directory and its Nginx site files. |

For `createAppOp`, use an empty `domain` for a worker or `app.example.com:5` for a web app with a five-minute promotion delay. The suffix is minutes, not a TCP port. A hostname with no suffix uses five minutes. Accepted delays are whole minutes from 1 to 525600.

An empty `additional.cmd` selects the default Docker command. Omitting it for an existing project preserves its saved command. Include the intended repository and domain when redeploying.

A project-status request body has this shape; placeholders represent credentials supplied privately by your client:

```json
{
  "op": "getAppOp",
  "email": "<your-email>",
  "password": "<your-password>",
  "name": "my-project"
}
```

The returned project's `additional` object can include `cmd`, `currentRelease`, `runtime`, `promotionDeadline`, `ps`, and `logs`. Runtime details include `release`, `pid`, `alive`, `active`, and a pending `promotionDeadline` where applicable. Logs are limited to the most recent 64 KiB.

## Instance operations

| `op` | Additional request fields | Behavior |
| --- | --- | --- |
| `registerOp` | None beyond `email`, `password` | Registers the first user, or a user when `allowRegister` is enabled. |
| `setJakeloudDomainOp` | `domain` | Reconfigures the dashboard domain and certificate. Requires authentication once users exist. |
| `setJakeloudAdditionalOp` | `additional` | Replaces the dashboard's additional settings; restricted to its owner. |
| `clearCacheOp` | None | Runs host-wide `docker system prune -af`. |

When updating `additional`, preserve existing fields you intend to retain; this is replacement, not a partial merge. The current UI does this for Telegram settings. Account access is shared across projects; this API does not provide project-scoped roles.

## Check results, not only HTTP status

Read operations may return `{"message":"login"}` or `{"message":"register"}` instead of the requested object. Unknown operations return `{"message":"noop"}`. Several rejected mutation paths return an empty response, so HTTP 200 alone does not prove that a mutation succeeded.

After requesting a deployment, fetch project status and check the release and runtime state. After requesting confirmation, check that the release became active. Request errors can return a generic `operation failed` message; inspect the server journal for details.

The contract is defined in the [API handlers](https://github.com/jakeloud/jl/tree/main/api) and may vary across releases.
