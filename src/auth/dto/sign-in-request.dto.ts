import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInRequestDto {
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
}
