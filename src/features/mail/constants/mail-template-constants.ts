import { environment } from '../../../../environments/environment';
import { MailOptions } from '../models/mail-options';

export const TEMPLATE_CFTIC_TABLE = `<table>
  <tr>
    <th>Curso</th>
    <th>Turno</th>
    <th>Fecha inicio</th>
    <th>Fecha fin</th>
    <th>Situación proceso selección</th>
  </tr>
  <tr>\${body}</tr>
</table>`;

export const MAIL_TEMPLATE_CONSTANTS: { [id: string]: MailOptions } = {
  cfticEthTrackingResult: {
    from: environment.SMTP_MAIL,
    to: environment.SMTP_MAIL,
    subject: 'CFTIC ETH Tracking Result',
    html: TEMPLATE_CFTIC_TABLE,
  },
  cfticAwsTrackingResult: {
    from: environment.SMTP_MAIL,
    to: environment.SMTP_MAIL,
    subject: 'CFTIC AWS Tracking Result',
    html: TEMPLATE_CFTIC_TABLE,
  },
};
