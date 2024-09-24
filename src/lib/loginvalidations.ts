import { z } from "zod";
const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .max(32, "Password cannot exceed 32 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  
export const LoginFormValidation = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: passwordValidation,
});
 