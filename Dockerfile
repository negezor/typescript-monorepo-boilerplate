FROM node:22.2.0-bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends\
        git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

# Shared
COPY shared/shared-template/package.json shared/shared-template/

# Services
COPY services/service-template/package.json services/service-template/

RUN npm ci

COPY . .

RUN npm run build

# Use docker compose "command" instead of "CMD" here
