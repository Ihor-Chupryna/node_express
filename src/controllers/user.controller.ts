import { NextFunction, Request, Response } from "express";

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

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const dto = req.body as Partial<IUser>;

      const user = await userService.updateById(userId, dto);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      await userService.deleteById(userId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
