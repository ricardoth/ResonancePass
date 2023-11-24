import { Comuna } from "./Comuna";

export interface Lugar {
    idLugar: number;
    idComuna: number;
    nombreLugar: string;
    ubicacion: string;
    numeracion: string;
    fechaCreacion: string;
    mapaReferencial: string;
    activo: boolean;
    comuna: Comuna | null;
}