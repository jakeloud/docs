FROM node

COPY . /app
RUN cd /app && npm install && npm run build

FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 app/build /usr/share/nginx/html
