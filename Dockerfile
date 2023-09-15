# base node image
FROM node:18-slim as base

# Install openssl for Prisma
RUN apt-get update \
  && apt-get install --no-install-recommends -y openssl procps vim-tiny sqlite3 \
  && apt-get clean \
  && npm i -g bun \
  && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV "production"
WORKDIR /app


# Setup production node_modules
FROM base as production-deps

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production


# Build the app
FROM base as build

COPY --from=base /app/node_modules /app/node_modules
COPY package.json bun.lockb ./
RUN bun install --offline --frozen-lockfile

COPY prisma .
RUN bun prisma generate

COPY . .
RUN bun run build


# Run the app
FROM base

COPY --from=production-deps /app/package.json /app/package.json
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=production-deps /app/tsconfig.json /app/tsconfig.json
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public

CMD ["bun", "start"]
