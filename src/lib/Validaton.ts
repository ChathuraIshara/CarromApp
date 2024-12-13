import { z } from "zod";
const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .max(32, "Password cannot exceed 32 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  
export const SignUpFormValidation = z.object({
    name: z.string()
        .min(2, "name must be at least 2 characters.")
        .max(50, "name must be at most 50 characters."),
    email: z.string().email("Please enter a valid email address."),
    index: z.string()
        .regex(/^\d{6}[A-Za-z]$/, { message: "Enter valid index."}),
    faculty:z.string(),
    phone: z.string().refine((phone) => /^\+?[0-9]{10}$/.test(phone), 'Please enter a valid phone number'),
    password: passwordValidation,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  
    email: z.string().email("Please enter a valid email address."),
    password: z.string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
    phone: z.string().refine((phone) => /^\+?[1-9]\d{10}$/.test(phone), 'Please enter a valid phone number'),
});
 