import { Evento } from "./Evento";

export interface Sector {
    IdSector: number;
    IdEvento: number;
    NombreSector: string;
    CapacidadDisponible: number;
    CapacidadActual: number;
    CapacidadTotal: number;
    Precio: number;
    Activo: boolean;
    Evento?: Evento;
}