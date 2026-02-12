<h1 align="center">Juniverse Dev</h1>
<p align="center">개인 포트폴리오 · 블로그 모노레포</p>
<p align="center">
  <a href="https://juniverse-dev.com" target="_blank">프로덕션 URL</a>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-111111?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/NestJS-Backend-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/PostgreSQL-DB-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-Deploy-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/AWS-Lightsail-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS Lightsail" />
</p>

<div style="border:1px solid #d0d7de; border-radius:12px; padding:16px; margin:20px 0;">
  <h2 style="margin-top:0;">프로젝트 개요</h2>
  <p style="margin-bottom:0;">
    <strong>Juniverse Dev</strong>는 사용자 사이트(<code>front</code>), 관리자 사이트(<code>admin</code>), API 서버(<code>back</code>)를
    하나의 모노레포에서 관리하는 구조입니다. 공통 API 레이어를 통해 프론트/백 간 타입 일관성을 유지하고,
    Docker 기반으로 운영 배포를 구성했습니다.
  </p>
</div>

<h2>아키텍처</h2>

<table>
  <thead>
    <tr>
      <th align="left">영역</th>
      <th align="left">설명</th>
      <th align="left">경로</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Front</strong></td>
      <td>사용자용 포트폴리오/블로그 UI</td>
      <td><code>apps/front</code></td>
    </tr>
    <tr>
      <td><strong>Admin</strong></td>
      <td>콘텐츠/운영 관리 UI</td>
      <td><code>apps/admin</code></td>
    </tr>
    <tr>
      <td><strong>Back</strong></td>
      <td>REST API, 비즈니스 로직, 데이터 처리</td>
      <td><code>apps/back</code></td>
    </tr>
    <tr>
      <td><strong>Shared APIs</strong></td>
      <td>타입 기반 API 클라이언트/서버 헬퍼</td>
      <td><code>libs/apis</code></td>
    </tr>
    <tr>
      <td><strong>Shared Components</strong></td>
      <td>공용 UI 컴포넌트</td>
      <td><code>libs/components</code></td>
    </tr>
  </tbody>
</table>

<p><strong>요청 흐름:</strong> Front/Admin → Back API → PostgreSQL/Redis</p>

<h2>기술 스택</h2>

<p>
  <strong>Frontend</strong><br />
  <img src="https://img.shields.io/badge/Next.js-15-111111?style=flat-square&logo=next.js&logoColor=white" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
</p>
<p>
  <strong>Backend</strong><br />
  <img src="https://img.shields.io/badge/NestJS-10-E0234E?style=flat-square&logo=nestjs&logoColor=white" alt="NestJS 10" />
  <img src="https://img.shields.io/badge/TypeORM-ORM-FE6D73?style=flat-square" alt="TypeORM" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL 16" />
  <img src="https://img.shields.io/badge/Redis-7-DC382D?style=flat-square&logo=redis&logoColor=white" alt="Redis 7" />
</p>
<p>
  <strong>DevOps / Infra</strong><br />
  <img src="https://img.shields.io/badge/Docker-Container-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Docker_Compose-Orchestration-1D63ED?style=flat-square&logo=docker&logoColor=white" alt="Docker Compose" />
  <img src="https://img.shields.io/badge/Nginx-Reverse_Proxy-009639?style=flat-square&logo=nginx&logoColor=white" alt="Nginx" />
  <img src="https://img.shields.io/badge/Certbot-TLS-003A70?style=flat-square" alt="Certbot" />
  <img src="https://img.shields.io/badge/AWS_Lightsail-Deploy-FF9900?style=flat-square&logo=amazonaws&logoColor=white" alt="AWS Lightsail" />
</p>
<p>
  <strong>Monorepo</strong><br />
  <img src="https://img.shields.io/badge/pnpm-workspace-F69220?style=flat-square&logo=pnpm&logoColor=white" alt="pnpm workspace" />
</p>

<h2>저장소 구조</h2>

<pre><code>apps/
  front/   사용자 웹
  admin/   관리자 웹
  back/    API 서버
libs/
  apis/        공용 API 레이어
  components/  공용 UI 컴포넌트
docker/
  *.Dockerfile
script/
  table.sql
</code></pre>
