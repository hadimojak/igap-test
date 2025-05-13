import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { consola } from 'consola';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT as string);
}
bootstrap()
  .then(() => {
    consola.success('server succesfully started!');
  })
  .catch((err) => console.log(err));
