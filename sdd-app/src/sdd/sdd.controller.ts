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
  createTable(@Body() body: { tableName: string;}) {
    if (!body.tableName)
      throw new HttpException('missing tableName', HttpStatus.BAD_REQUEST);
    return this.sddService.createTable(body.tableName);
  }

  @Delete(':tableName')
  deleteTable(@Param('tableName') tableName: string) {
    return this.sddService.deleteTable(tableName);
  }

  // --- Insert Record ---
  @Post(':tableName')
  insertRecord(@Param('tableName') tableName: string, @Body() data: any): any {
    return this.sddService.insertRecord(tableName, data);
  }

  // --- Get All Records ---
  @Get(':tableName')
  getAllRecords(
    @Param('tableName') tableName: string,
    @Query('skip') skip = 0,
    @Query('limit') limit = 100,
  ) {
    return this.sddService.getAllRecords(tableName, skip, limit);
  }

  // --- Get One Record by ID ---
  @Get(':tableName/:id')
  getRecord(@Param('tableName') tableName: string, @Param('id') id: string) {
    return this.sddService.getRecord(tableName, id);
  }

  // --- Update Record by ID ---
  @Put(':tableName/:id')
  updateRecord(
    @Param('tableName') tableName: string,
    @Param('id') id: string,
    @Body() update: any,
  ) {
    return this.sddService.updateRecord(tableName, id, update);
  }

  // --- Delete Record by ID ---
  @Delete(':tableName/:id')
  deleteRecord(@Param('tableName') tableName: string, @Param('id') id: string) {
    return this.sddService.deleteRecord(tableName, id);
  }

  // --- List All Tables ---
  @Get('collections')
  listCollections(): any {
    return this.sddService.listCollections();
  }
}
