import { z } from "zod";

export const itemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export type ItemFormSchema = z.infer<typeof itemSchema>;
