import z from "zod";

export const LoginRequestValidation = z.object({
  email: z.string().email().min(5).max(255),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .max(255),
  fullname: z.string().optional(),
});

export type LoginRequestType = z.infer<typeof LoginRequestValidation>;
