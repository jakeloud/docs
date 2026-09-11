---
title: Prepare your application
description: Use Docker or a custom build and start command with Jakeloud's assigned port.
sidebar:
  order: 3
---

Each deployment gets a fresh repository checkout. Jakeloud runs the project's **Build and start command** from that release directory using `sh -c`, with an assigned port in `$PORT`.

## Default Docker deployment

Leave **Use default command** checked to build the repository's root `Dockerfile` and start its image. For a project named `my-project`, the command is:

```bash
docker build -t my-project . && exec docker run -p "$PORT":80 --rm my-project
```

Your container must serve HTTP on port **80**, listening on `0.0.0.0`. Jakeloud maps the assigned host port to that container port. Docker must already be installed on the server.

For a static website whose files are in `public/`, a minimal Dockerfile is:

```dockerfile
FROM nginx:alpine
COPY public/ /usr/share/nginx/html/
EXPOSE 80
```

For a site with a build step, build the files in an earlier stage and copy the actual output directory into Nginx. This documentation repository builds to `_site/`.

## Custom build and start commands

Uncheck **Use default command** to supply a command. Install any tools it needs on the host, or run them inside a container.

For a Node.js application with a lockfile, a build script, and a `server.js` that reads `process.env.PORT`:

```bash
npm ci && npm run build && exec node server.js
```

For a Docker application that listens on container port 3000:

```bash
docker build -t my-project . && exec docker run --rm -p "$PORT":3000 my-project
```

Keep the process in the foreground. Avoid `docker run -d`, shell backgrounding with `&`, or a fixed host port: Jakeloud tracks the command's process, and old and new releases may run at the same time. A command that exits is treated as an exited release, even if it exits successfully.

Commands execute under the Jakeloud service account, which the supplied systemd unit sets to root. Only deploy code and commands you trust on that server.

## More runtime examples

For a Go application whose main package is `./cmd/server` and which reads `PORT`, install Go on the host and use:

```bash
go build -o server ./cmd/server && exec ./server
```

For Podman, install it on the host and use a custom command with a Dockerfile serving port 80:

```bash
podman build -t my-project . && exec podman run --rm -p "$PORT":80 my-project
```

The dashboard’s **Docker Cache** action still invokes Docker; it does not manage Podman storage.

## Workers and persistent data

Leave **Enable domain and proxy** unchecked for a long-running worker that does not need an HTTP domain. It still needs a foreground command, but it does not need to listen on `$PORT`.

Store durable data outside the release checkout. For containers, add an appropriate volume mount to the command. Keep secrets out of Git; provide them through server-side configuration, such as a Docker `--env-file` path. Previous releases may overlap with the new one, so account for concurrent workers and database migrations.

Continue to [create a project](/guide/create-application/).
