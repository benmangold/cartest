#!/bin/sh

## ##
## starts nginx in a docker container
##
## use via `npm run client` or `npm run client-dev`
## ##

cd "$(dirname "$0")"

docker build . -t bm/nginx-alpine

docker run --rm -d --name nginx -p 81:80 \
-v $PWD/dist:/usr/share/nginx/html \
-v $PWD/nginx:/etc/nginx \
 bm/nginx-alpine:latest  

# docker exec -ti nginx sh
