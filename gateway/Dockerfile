FROM node:latest

RUN mkdir -p /var/www/gateway
WORKDIR /var/www/gateway
ADD . /var/www/gateway
RUN yarn install
CMD yarn run build && yarn run start:prod