import { Lugar } from "./Lugar";

export interface Evento {
    idEvento: number;
    idLugar: number;
    nombreEvento: string;
    descripcion: string;
    direccion: string;
    fecha: string;
    flyer: string;
    contenidoFlyer: string;
    observacion: string;
    productoraResponsable: string;
    activo: boolean;
    lugar: Lugar | null;
}