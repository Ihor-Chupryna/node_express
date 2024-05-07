import { NextFunction, Request, Response } from "express";

import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.errors";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new ApiError("No token provided", 401);
      }

      const payload = tokenService.checkToken(
        accessToken,
        TokenTypeEnum.ACCESS,
      );

      const checkTokenInDb = await tokenRepository.findByParams({
        accessToken,
      });
      if (!checkTokenInDb) {
        throw new ApiError("Invalid token", 401);
      }

      req.res.locals.jwtPayload = payload;
      next();
    } catch (err) {
      next(err);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const refreshToken = req.headers.authorization;
      if (!refreshToken) {
        throw new ApiError("No token provided", 401);
      }

      const payload = tokenService.checkToken(
        refreshToken,
        TokenTypeEnum.REFRESH,
      );

      const checkTokenInDb = await tokenRepository.findByParams({
        refreshToken,
      });
      if (!checkTokenInDb) {
        throw new ApiError("Invalid token", 401);
      }

      req.res.locals.jwtPayload = payload;
      req.res.locals.tokenPair = checkTokenInDb;
      next();
    } catch (err) {
      next(err);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
