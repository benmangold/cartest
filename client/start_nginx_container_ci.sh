#!/bin/bash
set -e
## ##
## starts nginx in a docker container on jenkins
##
## use via `npm run client-ci`
## ##

cd "$(dirname "$0")"

docker run -d -it --name nginx --network host \
-v $PWD/dist:/usr/share/nginx/html \
-v $PWD/nginx-ci:/etc/nginx \
 bm/nginx-alpine:latest

# docker exec -ti nginx sh
