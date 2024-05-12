import { RoleEnums } from "../enums/role.enums";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  age: number;
  role: RoleEnums;
  isDeleted: boolean;
  isVerified: boolean;
}

export interface IPublicUser {
  _id: string;
  name: string;
  email: string;
  age: number;
}

export interface IPrivetUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  role: RoleEnums;
  isDeleted: boolean;
  isVerified: boolean;
}
