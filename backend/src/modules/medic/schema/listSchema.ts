import z from "zod";
    
export const listMedicParamsSchema = z.object({
    id: z.string().uuid({ message: "Invalid ID format" }),
});

export const listMedicQuerySchema = z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
});