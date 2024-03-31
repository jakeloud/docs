FROM node:20.12.0-alpine3.19

COPY . /app
RUN cd /app && npm install && npm run build

FROM nginx:stable-alpine3.17-slim

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 app/build /usr/share/nginx/html
