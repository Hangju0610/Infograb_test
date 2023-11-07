import { IsEmail, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID(4)
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
