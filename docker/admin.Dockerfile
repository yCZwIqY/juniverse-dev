# syntax=docker/dockerfile:1
FROM node:24-alpine AS builder
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate
WORKDIR /app
# Cache dependency installation independently of application sources.
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .pnpmrc ./
COPY apps/front/package.json ./apps/front/
COPY apps/admin/package.json ./apps/admin/
COPY apps/back/package.json ./apps/back/
COPY libs/apis/package.json ./libs/apis/
COPY libs/components/package.json ./libs/components/
COPY libs/shared-types/package.json ./libs/shared-types/
RUN pnpm install --frozen-lockfile
COPY tsconfig.json ./
COPY libs ./libs
RUN pnpm --filter shared-types build && pnpm --filter apis build
COPY apps/admin ./apps/admin
RUN pnpm --filter admin build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
COPY --from=builder --chown=node:node /app/apps/admin/.next/standalone ./
COPY --from=builder --chown=node:node /app/apps/admin/.next/static ./apps/admin/.next/static
COPY --from=builder --chown=node:node /app/apps/admin/public ./apps/admin/public
USER node
EXPOSE 3000
CMD ["node", "apps/admin/server.js"]
