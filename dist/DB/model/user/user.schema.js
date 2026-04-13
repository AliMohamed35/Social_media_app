"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../../utils/common/enum");
exports.userSchema = new mongoose_1.Schema({
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
            if (this.userAgent == enum_1.USER_AGENT.google)
                return false;
            return true;
        },
    },
    credentialUpdatedAt: Date,
    phoneNumber: String,
    role: { type: String, enum: enum_1.SYS_ROLE, default: enum_1.SYS_ROLE.user },
    gender: { type: String, enum: enum_1.GENDER },
    userAgent: { type: String, enum: enum_1.USER_AGENT, default: enum_1.USER_AGENT.local },
    otp: { type: String },
    otpExpiryAt: { type: Date },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.userSchema
    .virtual("fullName")
    .get(function () {
    return this.firstName + " " + this.lastName;
})
    .set(function (value) {
    const [fname, lname] = value.split(" ");
    this.firstName = fname;
    this.lastName = lname;
});
