import { z } from "zod";

export const registerSecretaryBodySchema = z.object({
  name: z.string().min(2, { message: "Name is too short" }),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, { message: "Password must be at least 6 characters" })
});


