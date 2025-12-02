import nodemailer from "nodemailer";
import { google } from "googleapis";
import { IEmailProvider } from "./IEmailProvider";

const OAuth2 = google.auth.OAuth2;

export class NodemailerProvider implements IEmailProvider {
  private transporter;

  constructor() {
    const oauth2Client = new OAuth2(
      process.env.SMTP_CLIENT_ID,
      process.env.SMTP_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.SMTP_REFRESH_TOKEN,
    });

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.SMTP_USER,
        clientId: process.env.SMTP_CLIENT_ID,
        clientSecret: process.env.SMTP_CLIENT_SECRET,
        refreshToken: process.env.SMTP_REFRESH_TOKEN,
      },
    });
  }

  async sendEmail(
  to: string | string[],
  subject: string,
  htmlBody: string,
  attachments?: { filename: string; path?: string; content?: Buffer; cid?: string }[]
): Promise<void> {
  if (process.env.DISABLE_EMAIL === "true") {
    return;
  }

  console.log(`Sending email to: ${to}, subject: ${subject}`);

  await this.transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    html: htmlBody,
    attachments,
  });
}

}
