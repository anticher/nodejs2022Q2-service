export const jwtRefreshConstants = {
  secret: process.env.REFRESH_TOKEN_SECRET_KEY,
  accessTokenExpTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
};
