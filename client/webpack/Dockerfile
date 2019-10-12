FROM node:10.16-alpine

WORKDIR /tmp/app

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/community' >> /etc/apk/repositories
RUN apk update

COPY ./package.json /tmp/app/package.json

COPY ./package-lock.json /tmp/app/package-lock.json

COPY ./webpack.config.js /tmp/app/webpack.config.js

COPY ./.babelrc /tmp/app/.babelrc

# RUN npm i

RUN mkdir /tmp/app/client
