#!/bin/bash
set +e

echo ~~ stopping docker containers ~~

docker stop nginx
docker stop nodejs
docker stop mongo

echo ~~ removing docker containers ~~

docker rm nodejs
docker rm nginx
docker rm mongo