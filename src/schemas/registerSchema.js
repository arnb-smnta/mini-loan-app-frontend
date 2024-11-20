import { z } from "zod";

const usernameValidation = z
  .string()
  .min(2, "Username must be atleast 2 characters")
  .max(20, "Username must be not more than 20 characters")
  .regex(/^[a-zA-Z0-9_.]+$/, "Username must not contain special character");

export const registerSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email adress" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});
