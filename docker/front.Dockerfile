FROM node:24

RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

WORKDIR /app

COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./

COPY apps ./apps
COPY libs ./libs

RUN pnpm install --frozen-lockfile

# front 앱 빌드
RUN pnpm --filter apis build
RUN pnpm --filter front build

EXPOSE 3000
CMD ["pnpm", "--filter", "front", "start"]