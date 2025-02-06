FROM node:20.12.0-alpine3.19 AS frontend-stage

COPY . /app
WORKDIR /app
RUN npm i && npm run build

FROM nginx:stable-alpine3.17-slim

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-stage /app/_site /usr/share/nginx/html

