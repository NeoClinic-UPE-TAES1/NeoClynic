import { reportSchema } from "../../report/schema/reportSchema";
import z from "zod";

export const registerConsultationBodySchema = z.object({
    date: z.string()
            .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
            .transform((date) => new Date(date)),
    hasFollowUp: z.boolean(),
    medicId: z.string().uuid({ message: "Invalid medic ID format" }),
    patientId: z.string().uuid({ message: "Invalid patient ID format" }),
    report: reportSchema.optional(),
});

export const registerConsultationAuthSchema = z.object({
    userRole: z.enum(["MEDIC", "SECRETARY"], { message: "Unauthorized role" }),
});