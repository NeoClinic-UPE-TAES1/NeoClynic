import z from "zod";

export const deleteMedicParamsSchema = z.object({
    id: z.string().uuid({ message: "Invalid ID format" }),
});

export const deleteMedicBodySchema = z.object({
    adminPassword: z.string().min(6, { message: "Password is too short" }),
});
