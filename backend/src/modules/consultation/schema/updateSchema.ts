import { reportSchema } from "../../report/schema/reportSchema";
import z from "zod";

export const updateConsultationParamsSchema = z.object({
    id: z.string().uuid({ message: "Invalid consultation ID format" })
});

export const updateConsultationBodySchema = z.object({
    date: z.string()
                .refine((date) => !isNaN(Date.parse(date)), {
                    message: "Invalid date format",
                })
                .transform((date) => new Date(date))
                .refine((date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date >= today;
                }, {
                    message: "Date must be today or in the future",
                }).optional(),
    hasFollowUp: z.boolean().optional(),
    report: reportSchema.optional()
});

export const updateConsultationAuthSchema = z.object({
    userRole: z.enum(["MEDIC", "SECRETARY"], { message: "Unauthorized role" }),
});