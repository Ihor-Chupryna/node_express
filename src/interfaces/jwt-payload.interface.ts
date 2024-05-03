import { RoleEnums } from "../enums/role.enums";

export interface IJWTPayload {
  userId: string;
  role: RoleEnums;
}
