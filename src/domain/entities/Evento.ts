import { Lugar } from "./Lugar";

export interface Evento {
    IdEvento: number;
    IdLugar: number;
    NombreEvento: string;
    Direccion: string;
    Fecha: string;
    Flyer?: string;
    ContenidoFlyer?: string;
    Activo: boolean;
    Lugar?: Lugar;
}