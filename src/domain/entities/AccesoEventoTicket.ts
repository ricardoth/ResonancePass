export interface AccesoEventoTicket {
    idAccesoEvento: number;
    idTicket: number;
    idUsuario: number;
    rut: number;
    dv: string;
    nombres: string;
    apellidoP: string;
    apellidoM: string;
    idEstadoTicket: number;
    estadoTicket: string;
    fechaHoraEntrada: string;
    fechaHoraSalida: string;
}