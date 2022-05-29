import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authority } from 'src/entity/authority.entity';
import { AdminInfo } from 'src/entity/adminInfo.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminInfo, Authority])],
  controllers: [UserController],
  providers: [UserService],
})
export class AdminUserModule {}
