import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { MAIL_CONSTANTS } from '../constants/mail-constants';
import { MailException } from '../models/mail-exception';
import { MailOptions } from '../models/mail-options';

@Injectable()
export class MailService {
  private static _transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {}

  private getTransporter(): nodemailer.Transporter {
    if (!MailService._transporter) {
      MailService._transporter = nodemailer.createTransport({
        service: MAIL_CONSTANTS.provider,
        auth: {
          user: this.configService.get<string>('SMTP_MAIL'),
          pass: this.configService.get<string>('SMTP_PASSWORD'),
        },
      });
    }
    return MailService._transporter;
  }

  public verifyConnection(): Promise<boolean> {
    return this.getTransporter().verify();
  }

  public replaceHtmlBody(mailOptions: MailOptions, body: string): MailOptions {
    const mailOptionsToUse = { ...mailOptions };
    mailOptionsToUse.html = mailOptionsToUse.html.replace('${body}', body);
    return mailOptionsToUse;
  }

  public sendMail(mailOptions: MailOptions): Promise<any> {
    if (!mailOptions) {
      return Promise.reject(new MailException());
    }
    return this.getTransporter()
      .sendMail(mailOptions)
      .then((info) => {
        return info;
      })
      .catch((error) => Promise.reject(new MailException(error)));
  }
}
