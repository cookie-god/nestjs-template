import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { BaseResponse } from 'config/base.response';

// user 객체 리스트 정보
export abstract class AdminGetUsersResponseDataDetail {
  @ApiProperty({
    example: 1,
    description: '유저 아이디',
    required: true,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'user@email.com',
    description: '이메일',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '쿠키',
    description: '닉네임 (PM, Consultant는 조회 불가능)',
    required: false,
  })
  @IsString()
  nickname: string;

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

// result 객체 정보
export abstract class AdminGetUsersResponseData {
  @ApiProperty({
    description: 'user 객체 리스트',
    type: AdminGetUsersResponseDataDetail,
    required: true,
    isArray: true,
  })
  @IsArray()
  users: Array<AdminGetUsersResponseDataDetail>;
}

// response 객체
export abstract class AdminGetUsersResponse extends BaseResponse {
  @ApiProperty({
    description: 'result 객체',
    required: true,
  })
  @IsArray()
  result: AdminGetUsersResponseData;
}
