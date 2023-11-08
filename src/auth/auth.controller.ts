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
  Render,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiHeaders,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('Auth')
@ApiExtraModels(CommonUserDto)
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // GET 로그인 페이지 리턴
  @ApiOperation({
    summary: '로그인 페이지 리턴',
    description: '로그인 화면이 나오는 HTML 페이지 리턴',
  })
  @Get('login')
  @Render('login.ejs')
  async getLogin() {}

  // GET 로그아웃 페이지 리턴
  // @UseGuards(JwtAuthGuard)
  // @Get('logout')
  // async getLogout(@Res({ passthrough: true }) res: Response) {
  //   return res.render('logout.ejs');
  // }

  // POST 로그인 요청 API
  @ApiOperation({
    summary: '로그인 요청 API',
    description: '로그인 요청 API이며, 요청 완료시 Header로 토큰 전달',
  })
  @ApiResponse({
    description: '로그인 완료 응답',
    status: 201,
    headers: {
      Authorization: {
        description: 'Access Token을 의미',
      },
    },
    content: { body: { example: { success: true } } },
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async postLogin(
    @Body(new ValidationPipe()) data: LoginUserDto,
    // passthrough : Express와 같이 res를 통해서 return을 하고 싶은 경우 false로 설정
    @Res({ passthrough: false }) res: Response,
  ): Promise<any> {
    const Token = await this.authService.login(data.email);
    // 로그인 성공 시 header에 Authorization 설정 및
    // redirect으로 /logout HTML로 이동
    res
      .setHeader('Authorization', `Bearer ${Token.accessToken}`)
      .json({ success: true });
  }

  // Post 로그아웃 요청 API
  @ApiBearerAuth()
  @ApiOperation({
    summary: '로그아웃 요청 API',
    description:
      'Authorization을 통해 회원 검증을 진행하며, 검증 후 Authorization 헤더 제거 진행',
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'AccessToken을 의미한다.',
    },
  ])
  @ApiCreatedResponse({
    description: '로그아웃 요청 완료',
    content: { body: { example: { success: true } } },
  })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async postLogout(@Res({ passthrough: true }) res: Response) {
    res.removeHeader('Authorization');
    return { success: true };
  }

  // POST 회원가입 요청 API
  @ApiOperation({
    summary: '회원가입 요청 API',
    description:
      '회원가입 요청 API로써, Id는 이메일 형식이어야 하며, 비밀번호는 제한 없음',
  })
  @ApiCreatedResponse({
    schema: {
      allOf: [{ $ref: getSchemaPath(CommonUserDto) }],
    },
    description: '회원가입 완료 시 응답',
  })
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
