import z from "zod";

export const loginAdminBodySchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  twoFactorCode: z.string().min(6, "Two-factor code must be at least 6 characters long").max(6, "Two-factor code must be at most 6 characters long").optional(),
});

export const requestAdminPasswordResetBodySchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetAdminPasswordBodySchema = z.object({
  token: z.string().min(1, "Token is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters long"),
});
