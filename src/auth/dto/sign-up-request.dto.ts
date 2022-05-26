import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignUpRequestDto {
  @ApiProperty({
    example: 'email@email.com',
    description: 'email',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'cookie1234',
    description: 'password',
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'cookie1234',
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

  @ApiProperty({
    example: 'Master',
    description: 'Authority',
    required: true,
  })
  @IsString()
  authority: string;
}
