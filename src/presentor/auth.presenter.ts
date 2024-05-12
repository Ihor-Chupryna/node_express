import { ITokenResponse } from "../interfaces/token.interface";
import { IPrivetUser, IUser } from "../interfaces/user.interface";
import { UserPresenter } from "./user.presenter";

export class AuthPresenter {
  public static toResponseDto(data: { user: IUser; tokens: ITokenResponse }): {
    user: IPrivetUser;
    tokens: ITokenResponse;
  } {
    return {
      user: UserPresenter.toPrivetResponseDto(data.user),
      tokens: data.tokens,
    };
  }
}
