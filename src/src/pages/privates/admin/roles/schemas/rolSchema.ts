import { z } from "zod";

export const rolSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type RolFormSchema = z.infer<typeof rolSchema>;
