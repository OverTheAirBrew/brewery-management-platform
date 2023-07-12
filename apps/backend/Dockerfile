FROM node:18 as base
RUN npm i -g turbo pnpm

FROM base AS builder
# Set working directory
WORKDIR /app
COPY . .
RUN turbo prune --scope=@overtheairbrew/bpm-backend

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/turbo.json ./turbo.json

RUN pnpm install

FROM base AS sourcer
WORKDIR /app

COPY --from=installer /app/ .
COPY .gitignore .gitignore
RUN yarn turbo run build --scope=@overtheairbrew/bmp-backend...
RUN pnpm install --prod --force

FROM node:18-slim as runner
WORKDIR /app

ENV PORT=3000

COPY --from=sourcer /app/ .

RUN echo "Hello"

CMD [ "node", "apps/backend/dist/main.js" ]