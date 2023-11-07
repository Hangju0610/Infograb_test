import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CommonUserDto, CreateUserDto } from 'src/common/user.dto';
import { v4 as uuid } from 'uuid';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  // bcrypt를 위한 salt 생성
  private readonly salt: number;
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    // configService로 할 경우, .env의 SALT값이 String으로 넘어오기에
    // Number 생성자를 사용하여 Type을 변경
    this.salt = Number(this.configService.get('SALT'));
  }
  async findUser(email: string): Promise<CommonUserDto> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async createUser(data: CreateUserDto): Promise<CommonUserDto> {
    // bcrypt를 통한 단방향 암호화 진행
    const hashPassword = await hash(data.password, this.salt);
    // save method를 통하여 유저 정보 저장 후 return
    return await this.userRepository.save({
      id: uuid(),
      email: data.email,
      password: hashPassword,
    });
  }
}
