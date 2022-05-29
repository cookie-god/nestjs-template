import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignUpRequest {
  @ApiProperty({
    example: 'user@email.com',
    description: 'email',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'user1234',
    description: 'password',
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'user1234',
    description: 'confirm password',
    required: true,
  })
  @IsString()
  confirmPassword: string;

  @ApiProperty({
    example: '쿠키',
    description: 'nickname',
    required: true,
  })
  @IsString()
  nickname: string;
}
