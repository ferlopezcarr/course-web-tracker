import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { MailService } from './services/mail.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [MailService],
  imports: [CoreModule, ConfigModule],
  exports: [MailService],
})
export class MailModule {}
