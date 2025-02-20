# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# install dependencies
COPY . .
RUN bun install

ENV NODE_ENV=production
ENV PORT=10000

EXPOSE 10000

CMD [ "bun", "start" ]