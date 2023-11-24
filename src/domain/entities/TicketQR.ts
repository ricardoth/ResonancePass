import { Ticket } from "./Ticket";

export interface TicketQR {
    idTicketQR: number;
    idTicket: number;
    contenido: string;
    nombreTicketComprobante: string;
    activo: boolean;
    fechaCreacion: string;
    ticket: Ticket | null;
}