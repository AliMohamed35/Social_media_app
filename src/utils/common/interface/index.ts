import { USER_AGENT } from "../enum";
import { GENDER } from "../enum";
import { SYS_ROLE } from "../enum";

export interface IUser{
firstName: string,
lastName: string,
fullName?: string,
email: string,
password: string,
credentialUpdatedAt: Date,
phoneNumber?: string,
role: SYS_ROLE,
gender: GENDER,
userAgent: USER_AGENT
otp?: string | null,
otpExpiryAt: Date | null,
isVerified: boolean
}