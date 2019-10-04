FROM alpine:3.10.2

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories
RUN apk update
RUN apk add mongodb=3.4.4-r0

RUN mongo --version

# VOLUME /data/db

VOLUME [ "data", "/data/db"  ]

EXPOSE 27017 28017

COPY init.sh /tmp
ENTRYPOINT [ "/tmp/init.sh" ]
CMD [ "mongod", "--bind_ip", "0.0.0.0" ]