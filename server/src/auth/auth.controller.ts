import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Response,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Inertia } from 'src/inertia/inertia.decorator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // TODO: Prevent access to this page if user is already logged in
  @Get('/login')
  async getLogin(@Inertia() inertia) {
    await inertia.render({
      component: '/auth/login',
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Request() req,
    @Response() res,
    @Inertia() inertia,
  ): Promise<void> {
    const token = await this.authService.login(req.user);

    res.cookie('access_token', token, {
      sameSite: 'lax',
      httpOnly: true,
    });

    inertia.redirect(req.session.intended || '/');
  }

  @Get('/logout')
  logout(@Response() res, @Inertia() inertia): void {
    res.clearCookie('access_token');

    inertia.redirect('/');
  }

  @Get('/register')
  getRegister(@Inertia() inertia) {
    inertia.render({
      component: '/auth/register',
    });
  }

  @Post('/register')
  register(@Inertia() inertia, @Body() registerDto: Record<string, any>) {
    const user = this.authService.signUp(registerDto);

    if (user) {
      inertia.redirect(303, '/login');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req, @Inertia() inertia) {
    inertia.render({
      component: '/auth/profile',
      props: {
        user: req.user,
      },
    });
  }
}
