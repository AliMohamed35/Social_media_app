import { z } from "zod";
import { GENDER } from "../../utils";
import { LoginDTO, RegisterDTO } from "./auth.dto";

export const registerSchema = z.object<RegisterDTO>({
  fullName: z.string().min(2).max(20) as unknown as string,
  email: z.email() as unknown as string,
  password: z.string() as unknown as string,
  phoneNumber: z.string() as unknown as string,
  gender: z.enum(GENDER) as unknown as GENDER,
});

export const loginSchema = z.object<LoginDTO>({
  email: z.email() as unknown as string,
  password: z.string() as unknown as string,
});
