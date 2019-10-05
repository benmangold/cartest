#!/bin/bash
set +e
## https://stackoverflow.com/questions/34228864/stop-and-delete-docker-container-if-its-running

docker stop nginx
docker stop nodejs
docker stop mongo

docker rm nodejs
docker rm nginx
docker rm mongo