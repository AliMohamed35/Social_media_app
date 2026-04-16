import { Schema } from "mongoose";
import { IUser } from "../../../utils/common/interface";
import { GENDER, SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";
import { sendMail } from "../../../utils/email";

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
    isActive: {type: Boolean, default: false},
    otp: { type: String },
    otpExpiryAt: { type: Date },
    isVerified: { type: Boolean, default: false },
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

userSchema.pre("save", async function () {
  if (this.userAgent != USER_AGENT.google && this.isNew == true)
    await sendMail({
      to: this.email,
      subject: "Confirm your email!",
      html: `<h1>Your OTP is: ${this.otp}</h1>`,
    });
});
