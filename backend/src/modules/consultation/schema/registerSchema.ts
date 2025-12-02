import { reportSchema } from "../../report/schema/reportSchema";
import z from "zod";

export const registerConsultationBodySchema = z.object({
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
            }),
    hasFollowUp: z.boolean(),
    medicId: z.string().uuid({ message: "Invalid medic ID format" }),
    patientId: z.string().uuid({ message: "Invalid patient ID format" }),
    report: reportSchema.optional(),
});

export const registerConsultationAuthSchema = z.object({
    userRole: z.enum(["MEDIC", "SECRETARY"], { message: "Unauthorized role" }),
});