import { TipoUsuario } from "./TipoUsuario";

export interface Usuario {
    idUsuario: number;
    idTipoUsuario: number;
    rut: number;
    dV: string;
    nombres: string;
    apellidoP: string;
    apellidoM: string;
    direccion: string;
    telefono: string;
    correo: string;
    contrasena: string;
    activo: boolean;
    fechaCreacion: string;
    tipoUsuario: TipoUsuario | null;
}