import { Evento } from "./Evento";
import { MedioPago } from "./MedioPago";
import { Sector } from "./Sector";
import { Usuario } from "./Usuario";

export interface Ticket {
    IdTicket: number;
    IdUsuario: number;
    IdEvento: number;
    IdSector: number;
    IdMedioPago: number;
    MontoPago: number;
    MontoTotal: number;
    FechaTicket: string;
    Activo: boolean;
    FechaCreacion: string;
    FechaModified: string;
    Usuario?: Usuario;
    MedioPago?: MedioPago;
    Evento?: Evento;
    Sector?: Sector;
}