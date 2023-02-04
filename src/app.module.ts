import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackerModule } from './features/tracker/tracker.module';
import { ConfigModule } from '@nestjs/config';
import environment from '../environments/environment';

@Module({
  imports: [
    TrackerModule,
    ConfigModule.forRoot({
      load: [environment],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
