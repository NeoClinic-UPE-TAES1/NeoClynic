import z from "zod";

export const deletePatientParamsSchema = z.object({
    id: z.string().uuid({ message: "Invalid ID format" }),
});

export const deletePatientBodySchema = z.object({
    secretaryPassword: z.string().min(6, { message: "Password must be at least 6 characters" })
});

export const deletePatientAuthSchema = z.object({
    userId: z.string().uuid({ message: "Invalid user ID format" })
});