import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { devConfig } from "../../config";
import { IPayload } from "../common";

export const generateToken = ({
  payload,
  secretKey = devConfig.JWT_SECRET, // default value
  options,
}: {
  payload: object;
  secretKey?: string;
  options?: SignOptions;
}) => {
  return jwt.sign(payload, secretKey, options);
};

export const verifyToken = (token: string, secretKey: string = devConfig.JWT_SECRET) => {
  return jwt.verify(token, secretKey) as IPayload;
};

// refresh token mechanism 
// secret for user and secret for admin if exist