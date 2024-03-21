FROM oven/bun:alpine

COPY . /app
RUN cd /app && bun install && bun run build

FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 app/build /usr/share/nginx/html
