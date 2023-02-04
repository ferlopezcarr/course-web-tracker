
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

export type MailContentOptions = { subject: string; html: string };

export const MAIL_TEMPLATE_CONSTANTS: { [id: string]: MailContentOptions } = {
  cfticEthTrackingResult: {
    subject: 'CFTIC ETH Tracking Result',
    html: TEMPLATE_CFTIC_TABLE,
  },
  cfticAwsTrackingResult: {
    subject: 'CFTIC AWS Tracking Result',
    html: TEMPLATE_CFTIC_TABLE,
  },
};
