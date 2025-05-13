import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SddModule } from './sdd/sdd.module';

@Module({
  imports: [SddModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
