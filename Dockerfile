FROM node

COPY . .
RUN npm i
RUN npm run build

FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 build /usr/share/nginx/html
