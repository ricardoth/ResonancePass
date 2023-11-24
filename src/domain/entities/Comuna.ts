import { Region } from "./Region";

export interface Comuna {
    idComuna: number;
    idRegion: number;
    nombreComuna: string;
    activo: boolean;
    region: Region | null;
}