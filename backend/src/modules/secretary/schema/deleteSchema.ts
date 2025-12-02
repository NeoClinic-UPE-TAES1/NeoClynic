import { z } from "zod";

export const deleteSecretaryParamsSchema = z.object({
  id: z.string().uuid({ message: "Invalid ID format" }),
});

export const deleteSecretaryBodySchema = z.object({
  adminPassword: z.string().min(6, { message: "Password must be at least 6 characters" })
});