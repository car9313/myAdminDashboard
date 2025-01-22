import { z } from "zod";

export const requestsSchema = z.object({
  cantidad: z
    .number()
    .min(1, "Cantidad es requerida")
    .max(1000000, "Cantidad maxima 1000000"),
  status_solicitud: z.string().min(1, "Status Solicitud is required"),
  fecha: z.string().min(1, "Fecha is required"),
});

export type RequestFormSchema = z.infer<typeof requestsSchema>;
