# Juniverse Dev

개인 포트폴리오/블로그 서비스 모노레포입니다. `front`(사용자 사이트), `admin`(관리자), `back`(API)로 구성되어 있습니다.

## Stack

- Package manager: `pnpm` workspace
- Frontend: Next.js 15, React 19 (`apps/front`, `apps/admin`)
- Backend: NestJS, TypeORM, PostgreSQL, Redis (`apps/back`)
- Shared libs: `libs/apis`, `libs/components`
- Infra: Docker, Nginx, Certbot (`docker-compose.yml`)

## Project Structure

```text
apps/
  front/   # 사용자 웹
  admin/   # 관리자 웹
  back/    # API 서버
libs/
  apis/        # API client/server helper
  components/  # 공용 컴포넌트
docker/
  *.Dockerfile
script/
  table.sql
```

## Prerequisites

- Node.js 20+
- pnpm 10+
- Docker / Docker Compose (DB, Redis 또는 배포 실행 시)

## Install

```bash
pnpm install
```

## Environment Variables

아래 키를 각 앱의 환경파일에 맞게 설정합니다.

- `apps/back/.env`
  - `NEST_PORT`
  - `DATABASE_HOST`, `DATABASE_PORT`
  - `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
  - `REDIS_ENABLED`, `REDIS_HOST`, `REDIS_PORT`
  - `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `JWT_SECRET`
  - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
  - `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
  - `AWS_REGION`, `AWS_BUCKET_NAME`, `AWS_BUCKET_ENDPOINT`, `AWS_BUCKET_DOMAIN`
  - `NEXT_API_URL`, `NEXT_PUBLIC_API_URL`, `FRONT_URL`
- `apps/front/.env.local`
  - `NEXT_API_URL`, `NEXT_PUBLIC_API_URL`
  - `FRONT_URL`
  - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `apps/admin/.env.local`
  - `NEXT_API_URL`, `NEXT_PUBLIC_API_URL`
  - `FRONT_URL`
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`

## Local Development

1. PostgreSQL/Redis 실행

```bash
docker run -d --name juniverse-postgres -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=juniverse postgres:16
docker run -d --name juniverse-redis -p 6379:6379 redis:7-alpine
```

2. 앱 실행

```bash
# backend (default: 3002)
pnpm dev:back

# frontend
pnpm --filter front dev -- --port 3000

# admin
pnpm --filter admin dev -- --port 3001
```

기본값으로 `front`와 `admin` 모두 `3000` 포트를 사용하므로, 동시에 실행할 때는 포트를 분리해야 합니다.

## Build

```bash
pnpm build:apis
pnpm build:back
pnpm build:front
pnpm build:admin
```

## Docker Compose (Production Template)

```bash
docker compose up -d
```

`docker-compose.yml`은 `nginx`, `certbot`, `front`, `admin`, `back`, `postgres`, `redis` 서비스를 함께 띄우는 구성을 포함합니다.

## Database Schema Script

- 초기 테이블 참고 스크립트: `script/table.sql`
