import { Module } from '@nestjs/common';
import { MailModule } from '../mail/mail.module';
import { TrackerController } from './controllers/tracker.controller';
import { BrowserService } from './services/browser.service';
import { TrackerService } from './services/tracker.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [TrackerService, BrowserService],
  controllers: [TrackerController],
  imports: [MailModule, ConfigModule],
})
export class TrackerModule {}
