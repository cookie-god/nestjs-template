import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authority } from 'src/entity/authority.entity';
import { UserInfo } from 'src/entity/userInfo.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo, Authority])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
