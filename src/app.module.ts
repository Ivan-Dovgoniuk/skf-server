import { Module } from '@nestjs/common';
import { DataController } from './data/data.controller';
import { DataService } from './data/data.service';

@Module({
  imports: [],
  controllers: [DataController],
  providers: [DataService],
})
export class AppModule {}