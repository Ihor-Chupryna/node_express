import { EmailTypeEnum } from "../enums/email-type.enum";

export const emailTemplateConstant = {
  [EmailTypeEnum.WELCOME]: {
    templateId: "d-2ffd054cd3c543cda79a4e0ef7598ed7",
  },
  [EmailTypeEnum.RESET_PASSWORD]: {
    templateId: "",
  },

  [EmailTypeEnum.DELETE_ACCOUNT]: {
    templateId: "",
  },
};
