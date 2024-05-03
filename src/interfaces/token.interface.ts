export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenResponse extends ITokenPair {
  accessExpiresIn: string;
  refreshExpiresIn: string;
}
