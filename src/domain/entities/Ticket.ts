import { MedioPago } from "./MedioPago";
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
    Usuario: Usuario;
    MedioPago: MedioPago;
}