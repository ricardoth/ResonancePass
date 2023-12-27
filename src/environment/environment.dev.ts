export const environment = {
    //Configuraciones APP
    ID_APP: 99,
    TipoUsuarioCliente: 2,
    TipoUsuarioAdmin: 1,

    //MercadoPago Configs
    //TEST
    //PUBLIC_KEY_MERCADO_PAGO: "TEST-e55d0def-a456-46b4-9c21-25454bf74ec0",
    //Cuenta de Prueba con credenciales de producción
    // PUBLIC_KEY_MERCADO_PAGO: "APP_USR-7538cf1c-bea3-4e39-b026-6a9f3ef6a660",
    //MercadoPago PROD REAL
    //PUBLIC_KEY_MERCADO_PAGO: "APP_USR-34c88b58-6224-43eb-9ebb-935677bb6ab9",
    //Mercado Pago Cuenta Mario
    PUBLIC_KEY_MERCADO_PAGO: "APP_USR-3e8da9b5-69c7-4991-99a7-f891f0a8564d",

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
    // UrlTickets: "https://localhost:7100/api/Ticket",
    UrlMercadoPago: "https://api-decimatio-dev.azurewebsites.net/api/MercadoPago",
    // UrlMercadoPago: "https://localhost:7100/api/MercadoPago"
}