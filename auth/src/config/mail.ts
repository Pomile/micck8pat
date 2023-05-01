import nodemailer from "nodemailer";
import hbs from 'nodemailer-express-handlebars';
import SMTPTransport from "nodemailer/lib/smtp-transport"
import dotenv from 'dotenv';
import path from 'path';

const transporterConfig: SMTPTransport.Options = {
  host: process.env.SMTP_HOST,
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
}
/**
 * SMTP_USERNAME
 * SMTP_PORT
 * SMTP_PASSWORD
 */
class Mail {
  
  static transporter = nodemailer.createTransport(transporterConfig);

  static _sendEmail = (options: any, cb: any) => {
    this.transporter.use(
      "compile",
      hbs({
        viewEngine: {
          partialsDir: path.join(__dirname, "../views"),
          layoutsDir: path.join(__dirname, "../views"),
          defaultLayout: ""
        },
        viewPath: path.join(__dirname, "../views")
      })
    );
    const attachments = options.attachments
      ? [{ ...options.attachments }]
      : null;

    const mailOptions: any = {
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      template: options.template,
      context: {
        ...options.params
      },
      attachments
    };
    this.transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        return cb(err, null);
      }
      return cb(null, data);
    });
  };
}

export default Mail;
