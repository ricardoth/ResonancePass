import { Evento } from "./Evento";

export interface Sector {
    idSector: number;
    idEvento: number;
    nombreSector: string;
    capacidadDisponible: number;
    capacidadActual: number;
    capacidadTotal: number;
    precio: number;
    activo: boolean;
    evento?: Evento;
}