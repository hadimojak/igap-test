import { Module } from '@nestjs/common';
import { SddController } from './sdd.controller';
import { SddService } from './sdd.service';

@Module({
  controllers: [SddController],
  providers: [SddService],
})
export class SddModule {}
