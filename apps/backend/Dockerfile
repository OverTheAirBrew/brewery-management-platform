FROM node:18 as preinstall
WORKDIR /app

ENV NODE_ENV=production
ENV HUSKY_SKIP_INSTALL=1
ENV DOCKER=true

LABEL maintainer="Nick Sharp <nick@overtheairbrew.com>"

COPY . .

RUN npm ci --omit=dev

FROM node:18-slim

WORKDIR /app

COPY --from=preinstall /app ./

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

CMD node ./apps/backend/dist/main.js

