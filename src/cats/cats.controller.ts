import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { PositiveIntPipe } from 'src/common/positiveInt.pipe';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filters';
import { CatsService } from './cats.service';
import { SentryInterceptor } from 'src/common/interceptors/sentry.interceptor';

@Controller('cats')
@UseInterceptors(SentryInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // cats/
  @Get()
  @UseFilters(HttpExceptionFilter)
  getAllCat() {
    throw new HttpException('api is broken', 401);
    return 'all cats';
  }

  // cats/:id
  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    console.log(param);
    console.log(typeof param);
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updateParatialCat() {
    return 'update partial cat';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete cat';
  }
}
