import z from "zod";
    
export const listMedicParamsSchema = z.object({
    id: z.string().uuid({ message: "Invalid ID format" }),
});

export const listMedicQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().optional().default(10),
});