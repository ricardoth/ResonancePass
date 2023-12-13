export const environment = {
    //Configuraciones APP
    ID_APP: 99,

    //Configuraciones Autenticación
    BasicAuthType: "Basic",
    JWTAuthType: "Bearer",
    UserBasicAuth: 'UsrApiDecimatio',
    PasswordBasicAuth: 'a13997423b6df6a7131981d215f1d3bb',

    //Endpoints Tickets
    UrlEventos: "https://api-decimatio-dev.azurewebsites.net/api/Evento",
    UrlLugares: "https://api-decimatio-dev.azurewebsites.net/api/Lugar",
    UrlGetSectoresByEvento: "https://api-decimatio-dev.azurewebsites.net/api/Sector/GetSectoresByEvento/",
    UrlMedioPago: "https://api-decimatio-dev.azurewebsites.net/api/MedioPago",
    UrlUsuarios: "https://api-decimatio-dev.azurewebsites.net/api/Usuario",
    UrlGenerarTicket: "https://api-decimatio-dev.azurewebsites.net/api/Ticket/GenerarTickets",
    UrlTickets: "https://api-decimatio-dev.azurewebsites.net/api/Ticket",
}