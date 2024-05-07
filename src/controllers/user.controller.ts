import { NextFunction, Request, Response } from "express";

import { IJWTPayload } from "../interfaces/jwt-payload.interface";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { userService } from "../services/user.service";

class UserController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userRepository.getAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const user = await userService.getById(userId);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as IJWTPayload;
      const user = await userService.getMe(jwtPayload.userId);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as IJWTPayload;
      const dto = req.body as Partial<IUser>;

      const user = await userService.updateMe(jwtPayload.userId, dto);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as IJWTPayload;
      await userService.deleteMe(jwtPayload.userId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  public async softDeleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as IJWTPayload;
      await userService.softDeleteMe(jwtPayload.userId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
