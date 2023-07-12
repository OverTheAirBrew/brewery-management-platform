FROM node:18-bullseye as reinstall

RUN npm i -g pnpm

WORKDIR /app

COPY ./out .
RUN pnpm install
RUN pnpm prune --prod

FROM node:18-slim

ARG VERSION

ENV MIGRATE=true
ENV VERSION=${VERSION}

WORKDIR /app
COPY --from=reinstall /app .

CMD [ "node", "apps/backend/dist/main.js" ]