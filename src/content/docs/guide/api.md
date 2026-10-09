---
title: HTTP API
description: Read project status, deploy with domain and command arrays, and configure dashboard domains.
sidebar:
  order: 8
---

Send JSON to `POST https://<your-instance>/api`. The `op` field selects an operation. Authentication uses `email` and `password` in the request body.

## Operations

| `op` | Additional fields | Result |
| --- | --- | --- |
| `getConfOp` | None | Configuration with `apps` and `users`. Treat the complete response as sensitive. |
| `getAppOp` | `name` | A project with latest release status, runtime details, and recent logs. |
| `createAppOp` | `name`, `repo`, `domain`, `additional.cmd` | Creates a project or deploys a new release for an existing name. |
| `deleteAppOp` | `name` | Stops releases and removes the project directory and Nginx site files. |
| `setJakeloudDomainOp` | `domain` | Reconfigures dashboard domains and certificates. Requires email and authentication once users exist. |
| `registerOp` | No fields beyond `email`, `password` | Registers the first user, or another user when registration is enabled. |

## Deploy a project

`domain` is an array of unique hostnames without schemes, paths, or ports. Use `[]` for a worker. `additional.cmd` is an ordered array of shell commands; preparation steps finish first and the final command stays running.

```json
{
  "op": "createAppOp",
  "email": "<your-email>",
  "password": "<your-password>",
  "name": "my-project",
  "repo": "git@github.com:your-account/your-repository.git",
  "domain": ["app.example.com", "www.example.com"],
  "additional": {
    "cmd": [
      "npm ci",
      "npm run build",
      "exec node server.js"
    ]
  }
}
```

An empty or omitted command array selects the default Docker steps. Omitted domains mean no domains. When redeploying, send all intended domains and command steps; the operation replaces these settings.

Web releases promote automatically after the final process survives five seconds, followed by proxy and certificate setup. Workers skip the web startup wait. See [release behavior](/guide/releases/).

## Read status

Send `getAppOp` with `name`. The returned `additional` object can contain:

| Field | Meaning |
| --- | --- |
| `cmd` | Saved command array. |
| `currentRelease` | Latest numbered checkout. |
| `runtime` | `release`, `pid`, `alive`, and `active` for that release. |
| `ps` | Process status text. |
| `logs` | Up to the last 64 KiB of its log. |

The reported instance version is `version` on the `jakeloud` entry in `getConfOp.apps`. It is stored in configuration and can persist across binary upgrades. The [agent client](/guide/agents/#check-versions) checks that value against its own version before project operations.

## Check responses

Read operations can return `{"message":"login"}` or `{"message":"register"}`. Unknown operations return `{"message":"noop"}`.

Successful mutations return an empty HTTP 200 body. Some rejected mutation paths also return an empty response, so HTTP 200 alone does not prove that the requested change occurred. Fetch configuration or project status to verify the result. A deployment request does not mean the release is running.

See the [upstream handlers](https://github.com/jakeloud/jl/tree/main/api) for the full contract.
