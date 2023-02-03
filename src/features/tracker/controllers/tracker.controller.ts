import { Controller, Get } from '@nestjs/common';
import { MAIL_TEMPLATE_CONSTANTS } from 'src/features/mail/constants/mail-template-constants';
import { MailService } from '../../mail/services/mail.service';
import { TrackerService } from '../services/tracker.service';

@Controller('tracker')
export class TrackerController {
  constructor(
    private trackerService: TrackerService,
    private mailService: MailService,
  ) {}

  @Get('cfticEthCourse')
  async checkCfticEthCourseState() {
    const cfticInscriptionText =
      await this.trackerService.getCfticEthInscriptionText();
    if (!!cfticInscriptionText) {
      const mailOptions = this.mailService.replaceHtmlBody(
        MAIL_TEMPLATE_CONSTANTS.cfticEthTrackingResult,
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
      const mailOptions = this.mailService.replaceHtmlBody(
        MAIL_TEMPLATE_CONSTANTS.cfticAwsTrackingResult,
        cfticInscriptionText,
      );
      return this.mailService.sendMail(mailOptions).then((result) => {
        return cfticInscriptionText;
      });
    }
  }
}
