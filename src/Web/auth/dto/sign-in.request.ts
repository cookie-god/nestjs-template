import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInRequest {
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
}
