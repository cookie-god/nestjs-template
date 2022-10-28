import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { BaseResponse } from 'config/base.response';

class PostSearchEmailResultData {
  @ApiProperty({
    example: 'cookie-god@softsquared.com',
    description: '이메일',
    required: true,
  })
  @IsString()
  email: string;
}

export abstract class PostSearchEmailResponse extends BaseResponse {
  @ApiProperty({
    description: 'result 객체',
    required: true,
  })
  @IsArray()
  result: PostSearchEmailResultData;
}
