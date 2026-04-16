import { JwtPayload } from "jsonwebtoken";
import { USER_AGENT } from "../enum";
import { GENDER } from "../enum";
import { SYS_ROLE } from "../enum";
import { Request } from "express";
import { ObjectId } from "mongoose";

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
