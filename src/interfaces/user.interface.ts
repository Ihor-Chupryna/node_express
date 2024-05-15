import { RoleEnums } from "../enums/role.enums";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  age: number;
  role: RoleEnums;
  avatar: string;
  isDeleted: boolean;
  isVerified: boolean;
}

export interface IPublicUser {
  _id: string;
  name: string;
  email: string;
  age: number;
  avatar: string;
}

export interface IPrivetUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  role: RoleEnums;
  avatar: string;
  isDeleted: boolean;
  isVerified: boolean;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
