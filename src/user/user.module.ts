import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from 'src/entity/user-info.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {UserQuery} from "./user.query";
import {ApiSaveService} from "../api-save.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo])],
  controllers: [UserController],
  providers: [UserService, UserQuery, ApiSaveService],
})
export class UserModule {}
