import z from "zod";

export const listConsultationParamsSchema = z.object({
    id: z.string().uuid({ message: "Invalid ID format" }),
});

export const listConsultationAuthSchema = z.object({
    userId: z.string().uuid({ message: "Invalid user ID format" }),
    userRole: z.enum(["MEDIC", "SECRETARY"], { message: "Unauthorized role" }),
});

export const listConsultationQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().optional().default(10),
});