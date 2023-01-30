FROM node:lts
EXPOSE 80
COPY . .
RUN yarn
CMD yarn start
