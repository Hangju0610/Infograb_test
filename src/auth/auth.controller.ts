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
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Get('login')
  async getLogin(@Res({ passthrough: true }) res: Response) {
    res.render('login.ejs');
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async getLogout(@Res({ passthrough: true }) res: Response) {
    res.render('logout.ejs');
  }

  @UseGuards(JwtAuthGuard)
  @Post('login')
  async postLogin(
    @Body(new ValidationPipe()) data: LoginUserDto,
    // passthrough : Express와 같이 res를 통해서 return을 하고 싶은 경우 true로 설정
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const Token = await this.authService.login(data.email);
    // 로그인 성공 시 header에 Authorization 설정 및
    // redirect으로 /logout HTML로 이동
    res
      .setHeader('Authorization', `Bearer ${Token.accessToken}`)
      .redirect('logout');
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async postLogout(@Res({ passthrough: true }) res: Response) {
    res.header('accessToken');
  }

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
