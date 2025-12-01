import { observationSchema } from "../../observation/schema/observationSchema";
import { validateCPF } from "./validation";
import z from "zod";

export const updatePatientBodySchema = z.object({
    name: z.string().min(2, "Name is too short").optional(),
    birthDay: z.string()
        .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
        .transform((date) => new Date(date))
        .optional(),
    sex: z.enum(["M", "F"], { message: "Invalid sex value" }).optional(),
    cpf: z.string()
        .min(11, { message: "CPF must have 11 digits" })
        .max(11, { message: "CPF must have 11 digits" })
        .regex(/^\d+$/, { message: "CPF must contain only numbers" })
        .refine((cpf) => validateCPF(cpf), { message: "Invalid CPF" })
        .optional()
        .or(z.literal('')).transform(val => val === '' ? undefined : val),
    ethnicity: z.string().min(2, "Ethnicity is too short").optional(),
    email: z.string().email("Invalid email").optional(),
    observation: observationSchema.optional()
});

export const updatePatientParamsSchema = z.object({
    id: z.string().uuid({ message: "Invalid ID format" }),
});