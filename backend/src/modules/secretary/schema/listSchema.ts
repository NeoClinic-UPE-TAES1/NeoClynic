import { z } from "zod";

export const listSecretaryParamsSchema = z.object({
  id: z.string().uuid({ message: "Invalid ID format" }),
});

export const listSecretaryQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().optional().default(10),
});