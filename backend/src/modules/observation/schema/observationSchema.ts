import { z } from "zod";

export const observationSchema = z.object({
  comorbidity: z
    .string()
    .trim()
    .min(1, { message: "Comorbidity cannot be empty" })
    .optional(),
  allergies: z
    .string()
    .trim()
    .min(1, { message: "Allergies cannot be empty" })
    .optional(),
  medications: z
    .string()
    .trim()
    .min(1, { message: "Medications cannot be empty" })
    .optional(),
});

export type ObservationBody = z.infer<typeof observationSchema>;
