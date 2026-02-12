FROM node:24-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

WORKDIR /app

COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY .pnpmrc ./
COPY tsconfig.json ./

COPY apps ./apps
COPY libs ./libs

RUN pnpm install --frozen-lockfile
RUN pnpm --filter apis build
RUN pnpm --filter front build

FROM node:24-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/apps/front/.next/standalone ./
COPY --from=builder /app/apps/front/.next/static ./apps/front/.next/static
COPY --from=builder /app/apps/front/public ./apps/front/public

EXPOSE 3000
CMD ["node", "apps/front/server.js"]
