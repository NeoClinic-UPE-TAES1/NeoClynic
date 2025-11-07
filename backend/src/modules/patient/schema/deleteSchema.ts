import { validateCPF } from "./validation";
import z from "zod";

export const deletePatientParamsSchema = z.object({
    id: z.string().uuid({ message: "Invalid ID format" }),
});

export const deletePatientBodySchema = z.object({
    cpf: z.string()
                .min(11, { message: "CPF must have 11 digits" })
                .max(11, { message: "CPF must have 11 digits" })
                .regex(/^\d+$/, { message: "CPF must contain only numbers" })
                .refine((cpf) => validateCPF(cpf), { message: "Invalid CPF" }),
});