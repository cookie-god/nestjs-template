import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class PostSignUpRequest {
  @ApiProperty({
    example: 'cookie-god@softsquared.com',
    description: '이메일',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'cookie1234',
    description: '비밀번호',
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'cookie1234',
    description: '확인 비밀번호',
    required: true,
  })
  @IsString()
  confirmPassword: string;

  @ApiProperty({
    example: '010-1111-1111',
    description: '핸드폰 번호',
    required: true,
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: '쿠키',
    description: '닉네임',
    required: true,
  })
  @IsString()
  nickname: string;
}
