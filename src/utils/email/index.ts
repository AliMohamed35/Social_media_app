import nodemailer from "nodemailer";
import { devConfig } from "../../config/env/dev.config";

export const sendMail = () => {
  nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: devConfig.EMAIL,
        pass: devConfig.PASSWORD,
    }
  });
};
