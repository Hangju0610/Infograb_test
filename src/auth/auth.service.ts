import { LoginUserDto } from 'src/common/user.dto';
import { UserService } from './../user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(data: LoginUserDto) {
    // 이메일이 있는지 확인 진행(없다면 에러 처리)
    const user = await this.userService.findUser(data.email);
    if (!user)
      throw new BadRequestException('이메일과 비밀번호를 확인해주세요.');

    // 비밀번호가 일치하는지 확인 진행
    // bcrypt의 compare를 통해 진행하며, 일치할 경우 true, 불일치일 경우 false 반환
    const comparePassword = await compare(data.password, user.password);
    if (!comparePassword)
      throw new BadRequestException('이메일과 비밀번호를 확인해주세요.');

    return user;
  }
}
