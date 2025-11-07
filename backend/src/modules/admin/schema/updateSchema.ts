import z from "zod";

export const updateAdminParamsSchema = z.object({
    id: z.string().uuid({ message: "Invalid ID format" })
});

export const updateAdminBodySchema = z.object({
    name: z.string().min(2, "Name is too short").optional(),
    email: z.string().email("Invalid email").optional(),
    password: z.string().min(6, "Password must be at least 6 characters long").optional(),
});

export const updateAdminAuthSchema = z.object({
    userId: z.string().uuid({ message: "Invalid user ID format" })
});