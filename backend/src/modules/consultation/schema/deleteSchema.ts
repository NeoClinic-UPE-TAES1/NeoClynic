import z from "zod";

export const deleteConsultationParamsSchema = z.object({
    id: z.string().uuid({ message: "Invalid consultation ID format" })
});

export const deleteConsultationBodySchema = z.object({
    secretaryPassword: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

export const deleteConsultationAuthSchema = z.object({
    userId: z.string().uuid({ message: "Invalid user ID format" })
});
