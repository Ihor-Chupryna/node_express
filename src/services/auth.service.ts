import { config } from "../configs/config";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { ApiError } from "../errors/api.errors";
import { IForgot, ISetForgot } from "../interfaces/action-token.interface";
import { IJWTPayload } from "../interfaces/jwt-payload.interface";
import { IToken, ITokenResponse } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { sendGridService } from "./send-grid.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(
    dto: Partial<IUser>,
  ): Promise<{ user: IUser; tokens: ITokenResponse }> {
    await this.isMailExists(dto.email);
    const hashedPassword = await passwordService.hashPassword(dto.password);
    const user = await userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    const tokens = tokenService.generatePair({
      userId: user._id,
      role: user.role,
    });

    await tokenRepository.create({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      _userId: user._id,
    });

    const actionToken = tokenService.generateActionToken(
      {
        userId: user._id,
        role: user.role,
      },
      ActionTokenTypeEnum.VERIFY,
    );
    await actionTokenRepository.create({
      tokenType: ActionTokenTypeEnum.VERIFY,
      actionToken,
      _userId: user._id,
    });

    await sendGridService.sendByType(user.email, EmailTypeEnum.WELCOME, {
      name: dto.name,
      frontUrl: config.FRONT_URL,
      actionToken: actionToken,
    });
    return { user, tokens };
  }

  public async signIn(dto: {
    email: string;
    password: string;
  }): Promise<{ user: IUser; tokens: ITokenResponse }> {
    const user = await userRepository.getByParams({ email: dto.email });
    if (!user) {
      throw new ApiError("Wrong email or password", 401);
    }
    const isCompare = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isCompare) {
      throw new ApiError("Wrong email or password", 401);
    }

    const tokens = tokenService.generatePair({
      userId: user._id,
      role: user.role,
    });

    await tokenRepository.create({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      _userId: user._id,
    });

    return { user, tokens };
  }

  private async isMailExists(email: string): Promise<void> {
    const user = await userRepository.getByParams({ email });
    if (user) {
      throw new ApiError("email already exist", 400);
    }
  }

  public async refresh(
    jwtPayload: IJWTPayload,
    oldPair: IToken,
  ): Promise<ITokenResponse> {
    const newPair = tokenService.generatePair({
      userId: jwtPayload.userId,
      role: jwtPayload.role,
    });

    await tokenRepository.deleteById(oldPair._id);
    await tokenRepository.create({
      ...newPair,
      _userId: jwtPayload.userId,
    });
    return newPair;
  }

  public async forgotPassword(dto: IForgot): Promise<void> {
    const user = await userRepository.getByParams({ email: dto.email });
    if (!user) return;

    const token = tokenService.generateActionToken(
      {
        userId: user._id,
        role: user.role,
      },
      ActionTokenTypeEnum.FORGOT,
    );
    await actionTokenRepository.create({
      tokenType: ActionTokenTypeEnum.FORGOT,
      actionToken: token,
      _userId: user._id,
    });

    await sendGridService.sendByType(user.email, EmailTypeEnum.RESET_PASSWORD, {
      frontUrl: config.FRONT_URL,
      actionToken: token,
    });
  }

  public async setForgotPassword(
    dto: ISetForgot,
    jwtPayload: IJWTPayload,
  ): Promise<void> {
    const user = await userRepository.getById(jwtPayload.userId);
    if (!user) return;

    const hashedPassword = await passwordService.hashPassword(dto.password);
    await userRepository.updateById(user._id, { password: hashedPassword });
    await actionTokenRepository.deleteByParams({ _userId: user._id });
    await tokenRepository.deleteByParams({ _userId: user._id });
  }

  public async verify(jwtPayload: IJWTPayload): Promise<IUser> {
    const [user] = await Promise.all([
      userRepository.updateById(jwtPayload.userId, { isVerified: true }),
      actionTokenRepository.deleteByParams({
        tokenType: ActionTokenTypeEnum.VERIFY,
      }),
    ]);
    return user;
  }
}

export const authService = new AuthService();
