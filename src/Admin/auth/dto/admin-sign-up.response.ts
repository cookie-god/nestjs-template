import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, IsString } from 'class-validator';
import { BaseResponse } from 'config/base.response';

class AdminSignUpResultData {
  @ApiProperty({
    example: 1,
    description: '목표',
    required: true,
  })
  @IsNumber()
  adminId: number;

  @ApiProperty({
    example: 'email@email.com',
    description: '이메일',
    required: true,
  })
  @IsString()
  email: string;
}

export abstract class AdminSignUpResponse extends BaseResponse {
  @ApiProperty({
    description: 'result 객체',
    required: true,
  })
  @IsArray()
  result: AdminSignUpResultData;
}
