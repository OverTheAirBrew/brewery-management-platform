FROM node:18-bullseye as reinstall
WORKDIR /app

COPY ./out .
RUN yarn install --production

FROM node:18-slim

ARG VERSION

ENV MIGRATE=true
ENV VERSION=${VERSION}

WORKDIR /app
COPY --from=reinstall /app .

CMD [ "node", "apps/backend/dist/main.js" ]