export type StatusSolicitud =
  | "EN_PRODUCCION"
  | "PENDIENTE_DE_COMPROBACION"
  | "FINALIZADO";

export interface Solicitud {
  id: number;
  cantidad: number;
  status_solicitud: StatusSolicitud;
  fecha_solicitud: string; // formato "DD/MM/YYYY HH:mm"
}
