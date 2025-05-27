import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/api', bodyParser.raw({ type: 'application/octet-stream', limit: '1mb' }));

  await app.listen(3002);
}
bootstrap();