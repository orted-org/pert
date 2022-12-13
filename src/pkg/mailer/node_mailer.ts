import { Mailer } from "./mailer";
import * as nodemailer from "nodemailer";
export class NodeMailer implements Mailer {
  transporter: nodemailer.Transporter;
  constructor(service: string, port: number, mailId: string, password: string) {
    this.transporter = nodemailer.createTransport({
      service,
      port,
      auth: {
        user: mailId,
        pass: password,
      },
    });
  }
  Send(from: string, to: string, subject: string, body: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(
        {
          from: from,
          to: to,
          subject: subject,
          text: body,
        },
        function (err) {
          if (err) {
            return reject(err);
          } else {
            return resolve();
          }
        }
      );
    });
  }
  Close() {
    this.transporter.close();
  }
}
