#!/bin/bash
set -e
## ##
## starts mongo in a docker container
##
## use via `npm run db`
## ##

cd "$(dirname "$0")"

## reset db
# rm -rf data

mkdir -p data

# docker build -t bm/mongo-alpine .

docker run -d --name mongo -v $PWD/data:/data/db -p 27017:27017 bm/mongo-alpine:latest
  
## debug mongo container
# docker exec -ti mongo sh
