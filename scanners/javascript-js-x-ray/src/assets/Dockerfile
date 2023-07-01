FROM node:latest

WORKDIR /scanner

RUN npm i -g npm
RUN npm i @nodesecure/js-x-ray @nodesecure/i18n mime-types lodash

WORKDIR /target

COPY scan.mjs /scanner/scan.mjs

ENTRYPOINT node /scanner/scan.mjs
