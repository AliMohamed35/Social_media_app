import { Schema } from "mongoose";
import { IUser } from "../../../utils/common/interface";
import { GENDER, SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";

export const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      minLength: 3,
      maxLength: 20,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 20,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        if (this.userAgent == USER_AGENT.google) return false;
        return true;
      },
    },
    credentialUpdatedAt: Date,
    phoneNumber: String,
    role: { type: String, enum: SYS_ROLE, default: SYS_ROLE.user },
    gender: { type: String, enum: GENDER },
    userAgent: { type: String, enum: USER_AGENT, default: USER_AGENT.local },
    otp: { type: String },
    otpExpiryAt: { type: Date },
    isVerified: {type: Boolean, default: false}
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema
  .virtual("fullName")
  .get(function () {
    return this.firstName + " " + this.lastName;
  })
  .set(function (value: string) {
    const [fname, lname] = value.split(" ");
    this.firstName = fname as string;
    this.lastName = lname as string;
  });
