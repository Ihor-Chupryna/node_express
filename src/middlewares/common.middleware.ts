import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.errors";

class CommonMiddleware {
  public isIdValid(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.userId;
      if (!isObjectIdOrHexString(id)) {
        throw new ApiError("Invalid id", 400);
      }
      next();
    } catch (err) {
      next(err);
    }
  }

  public isBodyValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { value, error } = validator.validate(req.body);
        if (error) {
          throw new ApiError(error.details[0].message, 400);
        }
        req.body = value;
        next();
      } catch (err) {
        next(err);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
