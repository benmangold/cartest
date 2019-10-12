# encoding-server with nodejs and ffmpeg

FROM node:10.16-alpine

WORKDIR /tmp/app

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/community' >> /etc/apk/repositories
RUN apk update

RUN apk add ffmpeg


# COPY package.json /tmp/app/package.json

# COPY package-lock.json /tmp/app/package-lock.json

# RUN npm install --production

# # will not be needed in production image
# RUN npm install nodemon

COPY server /tmp/app/server

RUN mkdir /tmp/app/uploads
