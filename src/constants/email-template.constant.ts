import { EmailTypeEnum } from "../enums/email-type.enum";

export const emailTemplateConstants = {
  [EmailTypeEnum.WELCOME]: {
    templateName: "register",
    subject: "Welcome to our platform",
  },
  [EmailTypeEnum.FORGOT_PASSWORD]: {
    templateName: "reset-password",
    subject: "We control your password",
  },
};
