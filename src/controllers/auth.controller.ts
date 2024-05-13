import { NextFunction, Request, Response } from "express";

import { IForgot, ISetForgot } from "../interfaces/action-token.interface";
import { IJWTPayload } from "../interfaces/jwt-payload.interface";
import { IToken } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { AuthPresenter } from "../presentor/auth.presenter";
import { UserPresenter } from "../presentor/user.presenter";
import { authService } from "../services/auth.service";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as Partial<IUser>;
      const newUser = await authService.signUp(dto);
      const response = AuthPresenter.toResponseDto(newUser);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as { email: string; password: string };
      const data = await authService.signIn(dto);
      const response = AuthPresenter.toResponseDto(data);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as IJWTPayload;
      const tokenPair = req.res.locals.tokenPair as IToken;
      const data = await authService.refresh(jwtPayload, tokenPair);

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  public async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as IForgot;

      await authService.forgotPassword(body);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  public async setForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const body = req.body as ISetForgot;
      const jwtPayload = req.res.locals.jwtPayload as IJWTPayload;

      await authService.setForgotPassword(body, jwtPayload);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  public async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as IJWTPayload;
      const user = await authService.verify(jwtPayload);

      const response = UserPresenter.toPrivetResponseDto(user);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
