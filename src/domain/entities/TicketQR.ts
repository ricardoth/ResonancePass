import { Ticket } from "./Ticket";

export interface TicketQR {
    IdTicketQR: number;
    IdTicket: number;
    Contenido: string;
    NombreTicketComprobante: string;
    Activo: boolean;
    FechaCreacion: string;
    Ticket?: Ticket;
}