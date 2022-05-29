import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { BaseResponse } from 'config/base.response';

export abstract class GetUsersResponseData {
  @ApiProperty({
    example: 1,
    description: '유저 아이디',
    required: true,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'email@email.com',
    description: '이메일',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '쿠키',
    description: '닉네임 (PM은 조회 불가능)',
    required: false,
  })
  @IsString()
  nickname: string;

  @ApiProperty({
    example: 'Master',
    description: '권한 (PM, Consultant는 조회 불가능)',
    required: false,
  })
  @IsString()
  authority: string;

  @ApiProperty({
    example: '2022-05-27T02:06:44.000Z',
    description: '생성 날짜',
    required: true,
  })
  @IsString()
  createdAt: string;

  @ApiProperty({
    example: 'ACTIVE',
    description: '회원 상태',
    required: true,
  })
  @IsString()
  status: string;
}

export abstract class GetUsersResponse extends BaseResponse {
  @ApiProperty({
    description: 'result 객체 리스트',
    required: true,
  })
  @IsArray()
  result: GetUsersResponseData;
}
