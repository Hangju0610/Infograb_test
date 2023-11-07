import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CommonUserDto {
  @IsUUID(4)
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;
}

export class loginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
