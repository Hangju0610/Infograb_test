import { UserService } from './../user/user.service';
import {
  CommonUserDto,
  CreateUserDto,
  LoginUserDto,
} from 'src/common/user.dto';
import { AuthService } from './auth.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
} from '@nestjs/common';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Get('login')
  async getLogin() {}

  @Post('login')
  async postLogin(
    @Body(new ValidationPipe()) data: LoginUserDto,
  ): Promise<any> {
    const user = this.authService.validateUser(data);
    return user;
  }

  @Post('logout')
  async postLogout() {}

  @Post('signup')
  async postSignup(
    @Body(new ValidationPipe()) data: CreateUserDto,
  ): Promise<CommonUserDto> {
    // 이메일 존재 여부 확인
    const existUser = this.userService.findUser(data.email);
    if (existUser) throw new BadRequestException('이미 존재하는 이메일입니다.');
    // 비밀번호와 비밀번호 확인 일치 여부
    if (data.password !== data.confirmPassword)
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    // user 생성 진행
    const user = await this.userService.createUser(data);
    return user;
  }
}
