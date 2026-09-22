# syntax=docker/dockerfile:1
FROM node:24-bookworm-slim AS builder
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
COPY libs/shared-types ./libs/shared-types
COPY apps/back ./apps/back
RUN pnpm --filter back build
RUN pnpm --filter back deploy --legacy --prod /runtime

FROM node:24-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder --chown=node:node /runtime/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/apps/back/dist ./dist
COPY --from=builder --chown=node:node /runtime/package.json ./package.json
USER node
EXPOSE 3002
CMD ["node", "dist/main.js"]
