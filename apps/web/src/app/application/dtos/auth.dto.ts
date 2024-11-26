import { z } from "zod";

export const loginDto = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(12)
    .max(255)
    .refine(
      (value) =>
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).{12,255}$/.test(
          value,
        ),
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});

export type LoginDto = Readonly<z.infer<typeof loginDto>>;

export const registerDto = loginDto
  .extend({
    name: z.string().min(3).max(255),
    confirmPassword: z
      .string()
      .min(12)
      .max(255)
      .refine(
        (value) =>
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).{12,255}$/.test(
            value,
          ),
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match",
  });

export type RegisterDto = Readonly<z.infer<typeof registerDto>>;
