FROM oven/bun:1.2.15-alpine AS frontend-stage

COPY . /app
WORKDIR /app
RUN bun i && bun run build

FROM nginx:stable-alpine3.17-slim

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-stage /app/_site /usr/share/nginx/html

