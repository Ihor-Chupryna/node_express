import { config } from "../configs/config";
import { IPrivetUser, IPublicUser, IUser } from "../interfaces/user.interface";

export class UserPresenter {
  public static toPublicResponseDto(user: IUser): IPublicUser {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      avatar: user.avatar ? `${config.AWS_S3_ENDPOINT}/${user.avatar}` : null,
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
      avatar: user.avatar ? `${config.AWS_S3_ENDPOINT}/${user.avatar}` : null,
      isDeleted: user.isDeleted,
      isVerified: user.isVerified,
    };
  }
}
