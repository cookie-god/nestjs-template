import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SignUpRequest {
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
    example: 1,
    description: 'Authority',
    required: true,
  })
  @IsNumber()
  authority: number;
}
