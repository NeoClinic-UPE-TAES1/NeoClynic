import z from "zod";

export const authenticatedUserSchema = z.object({
  id: z.string().uuid({ message: "Invalid user ID" }),
});