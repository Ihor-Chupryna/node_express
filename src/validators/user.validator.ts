import joi from "joi";

import { regexConstant } from "../constants/regex.constant";

export class UserValidator {
  private static userName = joi.string().min(3).max(50);
  private static age = joi.number().min(18).max(99);
  private static phone = joi.string().min(10).max(50);
  private static email = joi
    .string()
    .regex(regexConstant.EMAIL)
    .trim()
    .lowercase();
  private static password = joi.string().regex(regexConstant.PASSWORD).trim();

  public static create = joi.object().keys({
    name: this.userName.required(),
    email: this.email.required().email(),
    password: this.password.required(),
    phone: this.phone.required(),
    age: this.age.required(),
  });

  public static update = joi.object().keys({
    name: this.userName,
    age: this.age,
    phone: this.phone,
  });

  public static login = joi.object().keys({
    email: this.email.required(),
    password: this.password.required(),
  });

  public static forgotPassword = joi.object().keys({
    email: this.email.required(),
  });

  public static setForgotPassword = joi.object().keys({
    password: this.password.required(),
  });
}
