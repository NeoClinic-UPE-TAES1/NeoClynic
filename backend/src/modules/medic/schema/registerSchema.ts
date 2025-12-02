import { z } from "zod";

export const registerMedicBodySchema = z.object({
    name: z.string().min(2, { message: "Name is too short" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password is too short" }),
    specialty: z.string().min(2, { message: "Specialty is too short" }),
});