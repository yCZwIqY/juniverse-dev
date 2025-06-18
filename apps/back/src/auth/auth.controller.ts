import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Google OAuth redirect
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const jwt = this.jwtService.sign(req.user, {
      secret: process.env.JWT_SECRET,
    });
    res.redirect(`${process.env.FRONT_URL}/oauth/callback?token=${jwt}`);
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {
    // GitHub OAuth redirect
  }

  @Get('github/redirect')
  @UseGuards(AuthGuard('github'))
  async githubLoginRedirect(@Req() req, @Res() res) {
    const jwt = this.jwtService.sign(req.user, {
      secret: process.env.JWT_SECRET,
    });
    res.redirect(`${process.env.FRONT_URL}/oauth/callback?token=${jwt}`);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
