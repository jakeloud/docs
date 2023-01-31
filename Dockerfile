FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY static /usr/share/nginx/html
