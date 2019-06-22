FROM node:12-alpine as node

WORKDIR /usr/src

COPY package.json yarn.lock ./

RUN yarn install

RUN mkdir dist

COPY src ./src
COPY *.js ./

RUN yarn build

FROM nginx:alpine

COPY --from=node /usr/src/dist /var/www/html

COPY nginx-default.conf /etc/nginx/conf.d/default.conf
