import z from "zod";

export const deleteConsultationParamsSchema = z.object({
    id: z.string().uuid({ message: "Invalid consultation ID format" })
});