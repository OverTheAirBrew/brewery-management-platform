FROM node:18 as builder

WORKDIR /app

RUN npm i -g turbo
COPY . .
RUN turbo prune --scope="@overtheairbrew/backend" --docker

FROM node:18 as installer

WORKDIR /app
RUN npm i -g turbo

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json

RUN npm ci

COPY --from=builder /app/out/full/ .
RUN turbo build --filter=@overtheairbrew/backend...

COPY ./apps/create-app-bundle.sh .

RUN ./minify-bundle.sh /app/packages /output/packages
RUN ./minify-bundle.sh /app/apps /output/apps

FROM node:18-slim
WORKDIR /app

ENV NODE_ENV=production
ENV HUSKY_SKIP_INSTALL=1

LABEL maintainer="Nick Sharp <nick@overtheairbrew.com>"
LABEL org.opencontainers.image.source https://github.com/overtheairbrew/brewery-management-platform

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=installer /output .
COPY --from=installer /app/node_modules ./node_modules

CMD node ./apps/backend/dist/main.js

