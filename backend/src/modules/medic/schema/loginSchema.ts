import z from "zod";

export const loginMedicBodySchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const requestMedicPasswordResetBodySchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetMedicPasswordBodySchema = z.object({
  token: z.string().min(1, "Token is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters long"),
});
