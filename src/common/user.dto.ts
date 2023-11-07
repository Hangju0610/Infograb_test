import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CommonUserDto {
  @IsUUID(4)
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}

export class loginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
