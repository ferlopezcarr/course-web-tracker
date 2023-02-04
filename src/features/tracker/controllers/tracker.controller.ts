import { Controller, Get } from '@nestjs/common';
import { MAIL_TEMPLATE_CONSTANTS } from 'src/features/mail/constants/mail-template-constants';
import { MailService } from '../../mail/services/mail.service';
import { TrackerService } from '../services/tracker.service';
import { ConfigService } from '@nestjs/config';

@Controller('tracker')
export class TrackerController {
  constructor(
    private trackerService: TrackerService,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  @Get('cfticEthCourse')
  async checkCfticEthCourseState() {
    const cfticInscriptionText =
      await this.trackerService.getCfticEthInscriptionText();
    if (!!cfticInscriptionText) {
      const mail = this.configService.get<string>('SMTP_MAIL') ?? '';
      const mailOptions = this.mailService.replaceHtmlBody(
        {
          ...MAIL_TEMPLATE_CONSTANTS.cfticEthTrackingResult,
          from: mail,
          to: mail,
        },
        cfticInscriptionText,
      );
      return this.mailService.sendMail(mailOptions).then((result) => {
        return mailOptions.html;
      });
    }
  }

  @Get('cfticAwsCourse')
  async checkCfticAwsCourseState() {
    const cfticInscriptionText =
      await this.trackerService.getCfticAwsInscriptionText();
    if (!!cfticInscriptionText) {
      const mail = this.configService.get<string>('SMTP_MAIL') ?? '';
      const mailOptions = this.mailService.replaceHtmlBody(
        {
          ...MAIL_TEMPLATE_CONSTANTS.cfticAwsTrackingResult,
          from: mail,
          to: mail,
        },
        cfticInscriptionText,
      );
      return this.mailService.sendMail(mailOptions).then((result) => {
        return cfticInscriptionText;
      });
    }
  }
}
