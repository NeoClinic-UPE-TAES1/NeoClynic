import z from "zod";

export const updateMedicParamsSchema = z.object({
    id: z.string().uuid({ message: "Invalid ID format" }),
});

export const updateMedicBodySchema = z.object({
    name: z.string().min(2, "Name is too short").optional(),
    email: z.string().email("Invalid email").optional(),
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
    specialty: z.string().min(2, "Specialty is too short").optional(),
    currentPassword: z.string().optional(),
});
