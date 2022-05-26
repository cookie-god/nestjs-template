import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';

class ResultObject {
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

export class SignUpResponseDto {
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
  result: ResultObject;
}
