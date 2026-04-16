import bcrypt from "bcryptjs";

// async to work in worker threads
export const generateHash = async (planText: string) => {
  return await bcrypt.hash(planText, 10);
};

export const compareHash = async (password: string, hashPassword: string) => {
  return await bcrypt.compare(password, hashPassword);
};
