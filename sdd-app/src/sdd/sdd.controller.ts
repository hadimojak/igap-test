import {
  Controller,
  Post,
  Delete,
  Get,
  Put,
  Param,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SddService } from './sdd.service';

@Controller('sdd')
export class SddController {
  constructor(private readonly sddService: SddService) {}

  @Post('create')
  createTable(
    @Body('tableName') tableName: string,
    @Body('type') type: string,
  ) {
    if (!tableName)
      throw new HttpException('missing tableName', HttpStatus.BAD_REQUEST);
    return this.sddService.createTable(tableName, type);
  }

  // @Delete(':tableName')
  // // async deleteTable(@Param('tableName') tableName: string) {
  // //   return this.sddService.deleteTable(tableName);
  // }
}
