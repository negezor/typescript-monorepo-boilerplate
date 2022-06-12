FROM node:18.3-alpine3.16

RUN ln -s /lib/libc.musl-x86_64.so.1 /lib/ld-linux-x86-64.so.2 \
	# && apk add --no-cache libc6-compat
	&& apk add --no-cache git

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

# Shared
COPY shared/shared-template/package.json shared/shared-template/

# Services
COPY services/service-template/package.json services/service-template/

RUN npm ci

COPY . .

RUN npm run build

# Use docker-compose "command" instead of "CMD" here
