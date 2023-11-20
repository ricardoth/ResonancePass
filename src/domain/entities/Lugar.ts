import { Comuna } from "./Comuna";

export interface Lugar {
    IdLugar: number;
    IdComuna: number;
    NombreLugar: string;
    Ubicacion: string;
    Numeracion: string;
    FechaCreacion: string;
    Activo: boolean;
    Comuna?: Comuna;
}