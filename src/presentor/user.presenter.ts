import { IPrivetUser, IPublicUser, IUser } from "../interfaces/user.interface";

export class UserPresenter {
  public static toPublicResponseDto(user: IUser): IPublicUser {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
    };
  }

  public static toPublicResponseListDto(users: IUser[]): IPublicUser[] {
    return users.map(UserPresenter.toPublicResponseDto);
  }

  public static toPrivetResponseDto(user: IUser): IPrivetUser {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      role: user.role,
      isDeleted: user.isDeleted,
      isVerified: user.isVerified,
    };
  }
}
