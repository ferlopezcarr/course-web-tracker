import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpService } from './services/http.service';

@Module({
  providers: [HttpService],
  imports: [ConfigModule],
  exports: [ConfigModule, HttpService],
})
export class CoreModule {}
