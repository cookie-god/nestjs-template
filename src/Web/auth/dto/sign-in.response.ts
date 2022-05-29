import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { BaseResponse } from 'config/base.response';

class SignInResponseData {
  @ApiProperty({
    example: 'JWT 토큰',
    description: 'JWT 토큰',
    required: true,
  })
  @IsString()
  jwt: string;

  @ApiProperty({
    example: 1,
    description: '유저 아이디',
    required: true,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: 'email@email.com',
    description: '이메일',
    required: true,
  })
  @IsString()
  email: string;
}

export abstract class SignInResponse extends BaseResponse {
  @ApiProperty({
    description: 'result 객체',
    required: true,
  })
  @IsArray()
  result: SignInResponseData;
}
