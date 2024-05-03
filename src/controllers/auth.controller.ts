import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as Partial<IUser>;
      const newUser = await authService.signUp(dto);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as { email: string; password: string };
      const data = await authService.signIn(dto);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
