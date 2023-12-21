export const environment = {
    //Configuraciones APP
    ID_APP: 99,
    TipoUsuarioCliente: 2,
    TipoUsuarioAdmin: 1,

    //MercadoPago Configs
    PUBLIC_KEY_MERCADO_PAGO: "TEST-e55d0def-a456-46b4-9c21-25454bf74ec0",

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
    // UrlUsuarios: "https://localhost:7100/api/Usuario",
    UrlGenerarTicket: "https://api-decimatio-dev.azurewebsites.net/api/Ticket/GenerarTickets",
    UrlTickets: "https://api-decimatio-dev.azurewebsites.net/api/Ticket",
    UrlMercadoPago: "https://api-decimatio-dev.azurewebsites.net/api/MercadoPago"
}