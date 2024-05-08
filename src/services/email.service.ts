import path from "node:path";

import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

import { config } from "../configs/config";
import { emailTemplateConstants } from "../constants/email-template.constant";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { ApiError } from "../errors/api.errors";

class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      from: "no reply",
      service: "gmail",
      auth: {
        user: config.NO_REPLY_EMAIL,
        pass: config.NO_REPLY_EMAIL_PASSWORD,
      },
    });

    const hbsOptions = {
      viewEngine: {
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(
          process.cwd(),
          "src",
          "email-templates",
          "layouts",
        ),
        partialsDir: path.join(
          process.cwd(),
          "src",
          "email-templates",
          "partials",
        ),
      },
      viewPath: path.join(process.cwd(), "src", "email-templates", "views"),
      extName: ".hbs",
    };
    this.transporter.use("compile", hbs(hbsOptions));
  }

  public async sendMail(
    email: string,
    emailType: EmailTypeEnum,
    context: Record<string, string>,
  ) {
    try {
      const { subject, templateName } = emailTemplateConstants[emailType];
      return this.transporter.sendMail({
        to: email,
        subject,
        template: templateName,
        context,
      });
    } catch (err) {
      throw new ApiError(err.message, err.status);
    }
  }
}

export const emailService = new EmailService();
