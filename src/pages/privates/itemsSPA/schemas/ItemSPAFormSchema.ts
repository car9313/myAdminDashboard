import { z } from "zod";

export const itemSPASchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export type ItemSPASchemaType = z.infer<typeof itemSPASchema>;
