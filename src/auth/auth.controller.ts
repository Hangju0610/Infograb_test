import { AuthService } from './auth.service';
import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('login')
  async getLogin() {}

  @Post('login')
  async postLogin() {}

  @Post('logout')
  async postLogout() {}

  @Post('signup')
  async postSignup() {}
}
