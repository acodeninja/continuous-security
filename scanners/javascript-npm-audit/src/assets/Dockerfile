FROM node:latest

WORKDIR /target
COPY scan.sh /

RUN npm i -g npm

ENTRYPOINT bash /scan.sh
