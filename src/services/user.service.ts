import { ApiError } from "../errors/api.errors";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    return await userRepository.create(dto);
  }

  public async getById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    return user;
  }

  public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("user not found", 404);
    }

    return await userRepository.updateById(userId, dto);
  }

  public async deleteById(userId: string): Promise<void> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("user not found", 404);
    }

    return await userRepository.deleteById(userId);
  }
}

export const userService = new UserService();
