import { Evento } from "./Evento";
import { MedioPago } from "./MedioPago";
import { Sector } from "./Sector";
import { Usuario } from "./Usuario";

export interface Ticket {
    idTicket: number;
    idUsuario: number;
    idEvento: number;
    idSector: number;
    idMedioPago: number;
    montoPago: number;
    montoTotal: number;
    fechaTicket: string;
    activo: boolean;
    fechaCreacion: string;
    fechaModified: string;
    usuario: Usuario | null;
    medioPago: MedioPago | null;
    evento: Evento | null;
    sector: Sector | null;
}