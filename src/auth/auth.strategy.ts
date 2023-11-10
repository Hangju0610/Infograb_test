import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginUserDto } from 'src/common/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      password: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const data: LoginUserDto = { email, password };
    const user = await this.authService.validateUser(data);
    if (!user) {
      throw new UnauthorizedException('이메일 혹은 비밀번호를 확인해주세요.');
    }
    return user;
  }
}
