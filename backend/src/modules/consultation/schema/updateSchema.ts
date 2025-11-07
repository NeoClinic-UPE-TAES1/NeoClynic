import { reportSchema } from "../../report/schema/reportSchema";
import z from "zod";

export const updateConsultationParamsSchema = z.object({
    id: z.string().uuid({ message: "Invalid consultation ID format" })
});

export const updateConsultationBodySchema = z.object({
    date: z.string()
                .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
                .transform((date) => new Date(date)),
    hasFollowUp: z.boolean().optional(),
    report: reportSchema.optional(),
    userRole: z.enum(["MEDIC", "SECRETARY"], { message: "Unauthorized role" })
});

export const updateConsultationAuthSchema = z.object({
    userRole: z.enum(["MEDIC", "SECRETARY"], { message: "Unauthorized role" }),
});