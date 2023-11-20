import { Region } from "./Region";

export interface Comuna {
    IdComuna: number;
    IdRegion: number;
    NombreComuna: string;
    Activo: boolean;
    Region?: Region;
}