import z from "zod";

export const loginSecretaryBodySchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const requestSecretaryPasswordResetBodySchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetSecretaryPasswordBodySchema = z.object({
  token: z.string().min(1, "Token is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters long"),
});
