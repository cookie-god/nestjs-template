import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, IsString } from 'class-validator';
import { BaseResponse } from 'config/base.response';

class SignUpResultData {
  @ApiProperty({
    example: 1,
    description: '목표',
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

  @ApiProperty({
    example: '쿠키',
    description: '닉네임',
    required: true,
  })
  @IsString()
  nickname: string;
}

export abstract class SignUpResponse extends BaseResponse {
  @ApiProperty({
    description: 'result 객체',
    required: true,
  })
  @IsArray()
  result: SignUpResultData;
}
