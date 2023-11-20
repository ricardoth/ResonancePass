import { TipoUsuario } from "./TipoUsuario";

export interface Usuario {
    IdUsuario: number;
    IdTipoUsuario: number;
    Rut: number;
    DV: string;
    Nombres: string;
    ApellidoP: string;
    ApellidoM: string;
    Direccion: string;
    Telefono: string;
    Correo: string;
    Activo: boolean;
    FechaCreacion: string;
    TipoUsuario?: TipoUsuario;
}