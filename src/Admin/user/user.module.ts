import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from 'src/entity/user-info.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo])],
  controllers: [UserController],
  providers: [UserService],
})
export class AdminUserModule {}
