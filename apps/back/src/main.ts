import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ResponseInterceptor } from './common/response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    process.env.FRONT_URL,
    process.env.ADMIN_URL,
    process.env.NEXTAUTH_URL,
  ].filter((origin): origin is string => Boolean(origin));

  const sharedDomain = (() => {
    try {
      const baseHost = new URL(process.env.FRONT_URL ?? '').hostname;
      return baseHost.split('.').slice(-2).join('.');
    } catch {
      return '';
    }
  })();

  app.enableCors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);

      try {
        const { hostname, protocol } = new URL(origin);
        const isSameRootDomain =
          sharedDomain.length > 0 &&
          protocol === 'https:' &&
          (hostname === sharedDomain || hostname.endsWith(`.${sharedDomain}`));

        if (isSameRootDomain) return callback(null, true);
      } catch {
        return callback(new Error('Not allowed by CORS'), false);
      }

      return callback(new Error('Not allowed by CORS'), false);
    },
  });

  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ limit: '20mb', extended: true }));
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.NEST_PORT ?? 3002);
}

bootstrap();
