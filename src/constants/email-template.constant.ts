import { EmailTypeEnum } from "../enums/email-type.enum";

export const emailTemplateConstant = {
  [EmailTypeEnum.WELCOME]: {
    templateId: "d-2ffd054cd3c543cda79a4e0ef7598ed7",
  },
  [EmailTypeEnum.RESET_PASSWORD]: {
    templateId: "d-6a8d6253880741888b8e7f6ea7825411",
  },

  [EmailTypeEnum.DELETE_ACCOUNT]: {
    templateId: "",
  },
};
