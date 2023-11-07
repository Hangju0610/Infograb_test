import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CommonUserDto, LoginUserDto } from 'src/common/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(data: LoginUserDto): Promise<CommonUserDto> {
    console.log(data);
    const user = await this.authService.validateUser(data);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
