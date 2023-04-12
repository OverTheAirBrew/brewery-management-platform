FROM node:18 AS installer

WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY ./out/json/ .
COPY ./out/package-lock.json ./package-lock.json
RUN npm ci

COPY ./out/full/ .
COPY turbo.json turbo.json


FROM node:18-slim AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs

USER nestjs

COPY --from=installer /app .

EXPOSE 3000

CMD node apps/backend/dist/main.js