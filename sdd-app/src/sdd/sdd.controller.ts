/* eslint-disable prettier/prettier */
import { Controller, Post, Delete, Get, Put, Param, Body, Query, HttpException, HttpStatus } from '@nestjs/common';
import { SddService } from './sdd.service';

@Controller('/sdd')
export class SddController {
  constructor(private readonly sddService: SddService) {}

  @Post('/create')
  createTable(@Body() body: { tableName: string }) {
    if (!body.tableName) throw new HttpException('missing tableName', HttpStatus.BAD_REQUEST);
    return this.sddService.createTable(body.tableName.trim());
  }

  @Delete('/:tableName')
  deleteTable(@Param() params: { tableName: string }) {
    return this.sddService.deleteTable(params.tableName);
  }

  @Post('/:tableName')
  insertRecord(@Param() params: { tableName: string }, @Body() data: any): any {
    return this.sddService.insertRecord(params.tableName, data);
  }

  @Get('/collections')
  listCollections(): any {
    return this.sddService.listCollections();
  }

  @Get('/:tableName')
  getAllRecords(@Param() params: { tableName: string }, @Query() query: { skip: number; limit: number }) {
    return this.sddService.getAllRecords(params.tableName, query.skip ?? 0, query.limit ?? 100);
  }

  @Get('/:tableName/:id')
  getRecord(@Param() params: { tableName: string; id: string }) {
    return this.sddService.getRecord(params.tableName, params.id);
  }

  @Put('/:tableName/:id')
  updateRecord(@Param() params: { tableName: string; id: string }, @Body() update: any) {
    return this.sddService.updateRecord(params.tableName, params.id, update);
  }

  @Delete('/:tableName/:id')
  deleteRecord(@Param() params: { tableName: string; id: string }) {
    return this.sddService.deleteRecord(params.tableName, params.id);
  }
}
