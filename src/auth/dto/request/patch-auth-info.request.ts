import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PatchAuthInfoRequest {
  @ApiProperty({
    example: '쿠키',
    description: '닉네임',
    required: true,
  })
  @IsString()
  nickname: string;
}
