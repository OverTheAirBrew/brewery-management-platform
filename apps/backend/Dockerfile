FROM node:18-slim

ENV NODE_ENV=production
ENV HUSKY_SKIP_INSTALL=1

LABEL maintainer="Nick Sharp <nick@overtheairbrew.com>"
LABEL org.opencontainers.image.source https://github.com/overtheairbrew/brewing-platform

WORKDIR /app

COPY ./out .

RUN arch=$(arch | sed s/aarch64/arm64/ | sed s/x86_64/amd64/)
RUN npm rebuild --arch=${arch}

CMD ["node", "./apps/backend/dist/main.js"]

