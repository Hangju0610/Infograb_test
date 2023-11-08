import { LoginUserDto } from 'src/common/user.dto';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(data: LoginUserDto) {
    // 이메일이 있는지 확인 진행(없다면 에러 처리)
    const user = await this.userService.findUser(data.email);
    if (!user) return null;

    // 비밀번호가 일치하는지 확인 진행
    // bcrypt의 compare를 통해 진행하며, 일치할 경우 true, 불일치일 경우 false 반환
    const comparePassword = await compare(data.password, user.password);

    if (comparePassword == true) {
      return user;
    }
    return null;
  }

  async login(userId: string) {
    const payload = { userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
