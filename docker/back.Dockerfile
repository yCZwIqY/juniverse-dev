FROM node:24

RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

WORKDIR /app

COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./

COPY apps ./apps

RUN pnpm install --frozen-lockfile

# back 앱 빌드
RUN pnpm --filter back build

EXPOSE 3000
CMD ["pnpm", "--filter", "back", "start"]