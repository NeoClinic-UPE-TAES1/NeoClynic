import { z } from "zod";

export const reportSchema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
  diagnosis: z
    .string()
    .min(3, { message: "Diagnosis must be at least 3 characters long" }),
  prescription: z
    .string()
    .min(3, { message: "Prescription must be at least 3 characters long" })
    .optional(),
});

export type ReportBody = z.infer<typeof reportSchema>;
