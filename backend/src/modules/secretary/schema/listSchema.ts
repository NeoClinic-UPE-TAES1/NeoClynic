import { z } from "zod";

export const listSecretaryParamsSchema = z.object({
  id: z.string().uuid({ message: "Invalid ID format" }),
});

export const listSecretaryQuerySchema = z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
});