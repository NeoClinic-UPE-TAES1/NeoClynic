import { observationSchema } from "../../observation/schema/observationSchema";
import { validateCPF } from "./validation";
import z from "zod";

export const registerPatientBodySchema = z.object({
    name: z.string().min(2, "Name is too short"),
    birthDay: z.string()
        .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
        .transform((date) => new Date(date)),
    sex: z.enum(["M", "F"], { message: "Invalid sex value" }),
    cpf: z.string()
        .min(11, { message: "CPF must have 11 digits" })
        .max(11, { message: "CPF must have 11 digits" })
        .regex(/^\d+$/, { message: "CPF must contain only numbers" })
        .refine((cpf) => validateCPF(cpf), { message: "Invalid CPF" }),
    ethnicity: z.string().min(2, "Ethnicity is too short"),
    email: z.string().email("Invalid email").optional(),
    observation: observationSchema.optional()
});