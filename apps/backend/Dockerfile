# FROM node:18 as base

# RUN add-apt-repository ppa:duh/golang && \
#   apt-get update \
#   apt-get install golang

# RUN npm i -g turbo@1.10.5 pnpm@8


# FROM base AS builder
# # Set working directory
# WORKDIR /app
# COPY . .
# RUN turbo prune --scope=@overtheairbrew/bmp-backend

# FROM base AS installer
# WORKDIR /app
# COPY --from=builder /app/out/ .
# COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
# COPY --from=builder /app/turbo.json ./turbo.json

# RUN pnpm install --dev

# FROM base AS sourcer
# WORKDIR /app

# COPY --from=installer /app/ .
# COPY .gitignore .gitignore
# RUN pnpm turbo run build --scope=@overtheairbrew/bmp-backend...
# RUN pnpm install --prod --force

# FROM node:18-slim as runner
# WORKDIR /app

# ENV PORT=3000

# COPY --from=sourcer /app/ .

# RUN echo "Hello"

# CMD [ "node", "apps/backend/dist/main.js" ]

FROM node:18-bullseye as reinstall

RUN npm i -g pnpm

WORKDIR /app

COPY ./out .
RUN pnpm install
RUN pnpm prune --prod

FROM node:18-slim

ENV MIGRATE=true

WORKDIR /app
COPY --from=reinstall /app .

CMD [ "node", "apps/backend/dist/main.js" ]