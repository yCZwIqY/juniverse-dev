import { Module } from '@nestjs/common';
import { GithubStrategy } from './github.strategy';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [GoogleStrategy, GithubStrategy, JwtService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
