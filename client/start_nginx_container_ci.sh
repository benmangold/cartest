#!/bin/sh

## ##
## starts nginx in a docker container
##
## use via `npm run client` or `npm run client-dev`
## ##

cd "$(dirname "$0")"

docker build . -t bm/nginx-alpine

docker run -d --name nginx -p 81:80 -p 3000:3000 \
-v $PWD/dist:/usr/share/nginx/html \
-v $PWD/nginx-ci:/etc/nginx \
 bm/nginx-alpine:latest  

# docker exec -ti nginx sh