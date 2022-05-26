import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';

class SignInResultObject {
  @ApiProperty({
    example: 'JWT 토큰',
    description: 'JWT 토큰',
    required: true,
  })
  @IsString()
  jwt: string;

  @ApiProperty({
    example: 'Master',
    description: '권한',
    required: true,
  })
  @IsString()
  authority: string;

  @ApiProperty({
    example: 'email@email.com',
    description: '이메일',
    required: true,
  })
  @IsString()
  email: string;
}

export class SignInResponseDto {
  @ApiProperty({
    example: true,
    description: 'API 성공 여부',
    required: true,
  })
  @IsBoolean()
  isSuccess: boolean;

  @ApiProperty({
    example: 1000,
    description: '코드 번호',
    required: true,
  })
  @IsNumber()
  code: number;

  @ApiProperty({
    example: '성공',
    description: 'API 성공 메시지',
    required: true,
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'result 객체',
    required: true,
  })
  @IsObject()
  result: SignInResultObject;
}
