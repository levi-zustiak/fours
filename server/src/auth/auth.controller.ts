import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // TODO: Prevent access to this page if user is already logged in
  @Get('/login')
  getLogin() {
    return {
      component: 'Auth/Login',
      props: {},
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Response() res): Promise<void> {
    const token = await this.authService.login(req.user);

    res.cookie('access_token', token, {
      sameSite: 'lax',
      httpOnly: true,
    });

    res.redirect(303, req.session.intended || '/');
  }

  @Get('/logout')
  logout(@Response() res): void {
    res.clearCookie('access_token');

    res.redirect(303, '/');
  }

  @Get('/register')
  getRegister() {
    return {
      component: 'Auth/Register',
      props: {},
    };
  }

  @Post('/register')
  register(@Response() res, @Body() registerDto: Record<string, any>) {
    this.authService.signUp(registerDto);

    res.redirect(303, '/login');
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return {
      component: 'Auth/Profile',
      props: {
        user: req.user,
      },
    };
  }
}
