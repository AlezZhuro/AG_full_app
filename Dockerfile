FROM node:20.4.0

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /app

RUN yarn install

COPY . .
