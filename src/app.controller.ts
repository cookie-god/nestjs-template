/* eslint-disable prettier/prettier */
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from '../config/jwt/jwt.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, // private readonly jwtService: JwtService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // getHello(@Request() req): string {
  //   return req.user;
  // }
}
