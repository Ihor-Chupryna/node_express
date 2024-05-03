import { ApiError } from "../errors/api.errors";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";

class AuthService {
  public async signUp(dto: Partial<IUser>): Promise<IUser> {
    await this.isMailExists(dto.email);
    const hashedPassword = await passwordService.hashPassword(dto.password);
    return await userRepository.create({ ...dto, password: hashedPassword });
  }

  public async signIn(dto: {
    email: string;
    password: string;
  }): Promise<IUser> {
    const user = await userRepository.getByParams({ email: dto.email });
    if (!user) {
      throw new ApiError("Wrong email or password", 401);
    }
    const isCompare = passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isCompare) {
      throw new ApiError("Wrong email or password", 401);
    }
    return user;
  }

  private async isMailExists(email: string): Promise<void> {
    const user = await userRepository.getByParams({ email });
    if (user) {
      throw new ApiError("email already exist", 400);
    }
  }
}

export const authService = new AuthService();
