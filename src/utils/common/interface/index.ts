import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { GENDER, SYS_ROLE, USER_AGENT } from "../enum";

export interface IUser {
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  password: string;
  credentialUpdatedAt: Date;
  phoneNumber?: string;
  role: SYS_ROLE;
  gender: GENDER;
  userAgent: USER_AGENT;
  isActive: boolean;
  otp?: string | null;
  otpExpiryAt: Date | null;
  isVerified: boolean;
}

export interface IUser{
  _id: ObjectId;
}

export interface IPayload extends JwtPayload {
  _id: ObjectId;
  role: string;
}

// re-open concept
declare module "express"{
  interface Request{
    user?: IUser;
  }
}
