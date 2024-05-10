import { MailDataRequired } from "@sendgrid/helpers/classes/mail";
import SendGrid from "@sendgrid/mail";

import { config } from "../configs/config";
import { emailTemplateConstant } from "../constants/email-template.constant";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { EmailTypeToPayloadType } from "../types/email-type-to-payload.type";

class SendGridService {
  constructor() {
    SendGrid.setApiKey(config.SENDGRID_API_KEY);
  }

  public async sendByType<T extends EmailTypeEnum>(
    email: string,
    type: T,
    templateData: EmailTypeToPayloadType[T],
  ): Promise<void> {
    try {
      const templateType = emailTemplateConstant[type].templateId;
      await this.send({
        from: config.SENDGRID_FROM_EMAIL,
        to: email,
        templateId: templateType,
        dynamicTemplateData: templateData,
      });
    } catch (err) {
      console.error("Error sending email", err);
    }
  }

  private async send(email: MailDataRequired): Promise<void> {
    try {
      await SendGrid.send(email);
    } catch (err) {
      console.error("Error sending email", err);
    }
  }
}

export const sendGridService = new SendGridService();
