---
sidebar_position: 3
---

# Application structure

You have to prepare your application to be cloud ready.

## Dockerfile

As a part of building process Jakeloud specifically seeks `Dockerfile` in the root of your repository.

Here is an example of `Dockerfile`, that is actually used for this documentation:

```Dockerfile
FROM node

COPY . .
RUN npm i && npm run build

FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 build /usr/share/nginx/html

```

For more information, see [Dockerfile reference](https://docs.docker.com/engine/reference/builder/).

:::info

Here I am using nginx to serve static files. In fact you can use any other server that has port 80 exposed.

:::

:::tip

Checkout [example nginx static server](https://github.com/nottgy/docker-nginx-static).

:::
