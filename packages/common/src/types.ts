import { email, z } from "zod";

export const signinSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
