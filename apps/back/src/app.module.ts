import { Module } from '@nestjs/common';
import { MenusModule } from './menus/menus.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { FilesModule } from './files/files.module';
import { ProjectsModule } from './projects/projects.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TrafficModule } from './traffic/traffic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        schema: 'public',
        autoLoadEntities: true,
        synchronize: true,
        logging: ['error', 'schema', 'query'],
      }),
    }),
    MenusModule,
    PostsModule,
    CommentsModule,
    FilesModule,
    ProjectsModule,
    DashboardModule,
    TrafficModule,
  ],
})
export class AppModule {}
