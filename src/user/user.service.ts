import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from 'src/common/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async findUser(email: string): Promise<UserDto> {
    const user = this.userRepository.findOneBy({ email });
    return user;
  }

  async createUser() {}
}
