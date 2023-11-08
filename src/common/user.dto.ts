import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CommonUserDto {
  @ApiProperty({
    description: 'user의 고유 ID, UUID 형태로 출력',
    nullable: false,
    example: '23514392-d62c-4259-a788-205b8cb3f8b7',
  })
  @IsUUID(4)
  id: string;

  @ApiProperty({
    nullable: false,
    description: 'email',
    example: 'test@naver.com',
  })
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({
    nullable: false,
    description: 'password, bcrypt를 이용해 단방향 암호화 진행',
    example: '$2b$05$od1XcBkDFYh2x5EAkekJUOqiqX0CKESO12q9OEUC3C8cLyMqZhP6W',
  })
  @IsString()
  password: string;
}

export class CreateUserDto {
  @ApiProperty({
    nullable: false,
    description: 'email형식이어야 한다.',
    example: 'test1@naver.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    nullable: false,
    description: 'password이며, 숫자, 문자 제한 없음',
    example: '1',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    nullable: false,
    description: 'password 확인용이며, password와 같아야 함',
    example: '1',
  })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}

export class LoginUserDto {
  @ApiProperty({
    nullable: false,
    description: 'email',
    example: 'test@naver.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ nullable: false, description: 'password', example: '1' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
