import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { avatarConfig } from "../constants/file.constant";
import { ApiError } from "../errors/api.errors";

class FileMiddleware {
  public isAvatarValid(req: Request, res: Response, next: NextFunction) {
    try {
      const avatar = req.files?.avatar as UploadedFile;
      if (!avatar) {
        throw new ApiError("Empty file", 400);
      }
      if (Array.isArray(avatar)) {
        throw new ApiError("Must be just one file", 400);
      }
      if (!avatarConfig.MIMETYPE.includes(avatar.mimetype)) {
        throw new ApiError("invalid file format", 400);
      }
      if (avatar.size > avatarConfig.MAX_SIZE) {
        throw new ApiError("File is too large", 400);
      }
      next();
    } catch (err) {
      next(err);
    }
  }
}

export const fileMiddleware = new FileMiddleware();
