import { useState, useContext, useEffect } from 'react';
import { useLocation } from "react-router-dom"
import { NavbarEvent } from "../../components/navbar/NavBarEvent";
import { formatCurrency } from "../../../types/currency";
import { formatDateHour } from '../../../utils/formatDateOption';
import { WayToPay } from './WayToPay';
import './ConfirmShop.css';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { environment } from '../../../environment/environment.dev';
import { Buffer } from 'buffer';
import { basicAuth } from '../../../types/basicAuth';
import { toast } from 'react-toastify';
import { Loader } from '../../components/loader/Loader';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const CURRENCY_CLP = 'CLP';
const URL_GENERAR_PAGO = environment.UrlMercadoPago + "/CrearPreferencia"
const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;
const PUBLIC_KEY_MP = environment.PUBLIC_KEY_MERCADO_PAGO;


export const ConfirmShop = () => {
    const { loginState } = useContext(AuthContext);
    const location = useLocation();
    const [ radioValue, setRadioValue ] = useState(0);
    const [ preferenceId, setPreferenceId ] = useState('');

    const tickets = location.state?.ticketDetails;
    const total: number = location.state?.sumTotal;
    const eventDetails = location.state?.evento;

    initMercadoPago(PUBLIC_KEY_MP);

    useEffect(() => {
        if(radioValue === 5) {
            handleBuyTicketMercadoPago();
        }
        if (radioValue !== 5)
            setPreferenceId('');
    }, [radioValue])

    const handleBuyTicketMercadoPago = async () => {
        const id = await createPreference();
        if(id)
            setPreferenceId(id);
    }

    const createPreference = async () => {
        try {

            let ticketList: any[] = [];
            let fecha = new Date();

            tickets.map((t: any) => {
                for (let index = 0; index < t.cantidad; index++) {
                    let obj: any = {};
                    obj.idUsuario = loginState.user.idUsuario;
                    obj.idEvento = eventDetails.idEvento;
                    obj.idSector = t.idSector;
                    obj.idMedioPago = radioValue;
                    obj.montoPago = t.precio;
                    obj.montoTotal = t.total;
                    obj.fechaTicket = fecha;
                    obj.activo = true;
                    ticketList.push(obj);
                }
            });

            let values = {
                description: `${eventDetails.nombreEvento}`,
                price: total,
                quantity: 1, 
                tickets: ticketList
            };

            let response = await axios.post(URL_GENERAR_PAGO, values, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                }
            });
            const {id} = response.data;
            return id;
            
        } catch (error: any) {
            console.log(error);
            toast.error("No se pudo generar el pago, por favor intente nuevamente o elija otro medio de pago");
        }
    }

    return (
        <>
            <NavbarEvent />
            <section className="section-top-panel">
                <article className="info-evento-container">
                    <div className="row info-evento-box">
                        <h4><strong>Tu Compra</strong></h4>
                        <div className="col-lg-3">
                            <h6><strong>Evento</strong></h6>
                            <div className="list-group list-group-flush list-event">
                                <li className="list-group-item">{eventDetails.nombreEvento}</li>
                                <li className="list-group-item"><i className="bi bi-calendar3"></i> {formatDateHour(eventDetails.fecha)} Hrs.</li>
                            </div>
                            <img src={eventDetails.contenidoFlyer} width={100}/> 
                        </div>
                    
                        <div className="col-lg-3">
                            <h6><strong>Sector</strong></h6>
                            <div className="list-group list-group-flush list-event">
                                {
                                    tickets.map((row: any) => (
                                        <li key={row.idSector} className="list-group-item">{row.nombreSector}</li>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="col-lg-2">
                            <h6><strong>Precio</strong></h6>
                            <div className="list-group list-group-flush list-event">
                                {
                                    tickets.map((row: any) => (
                                        <li key={row.idSector} className="list-group-item">{formatCurrency(row.total, CURRENCY_CLP)}</li>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="col-lg-2">
                            <h6><strong>Cantidad</strong></h6>
                            <div className="list-group list-group-flush list-event">
                                {
                                    tickets.map((row: any) => (
                                        <li key={row.idSector} className="list-group-item">{row.cantidad}</li>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <h6><strong>Total</strong></h6>
                            <p>{formatCurrency(total, CURRENCY_CLP)}</p>
                        </div>
                    </div>
                </article>
            </section>

            <section className="section-confirm-panel">
                <article className="info-evento-container">
                    <div id="panel-shop-account">
                        <WayToPay radioValue={radioValue} setRadioValue={setRadioValue} />
                    </div>

                    <div className="panel-method-shop">
                        <hr/> 
                        <div className="row g-2">
                            <div className="col-auto">
                                <h6><strong>Total</strong></h6>
                            </div>
                            <div className="col-auto">
                                <p><strong>{formatCurrency(total, CURRENCY_CLP)}</strong></p>
                            </div>
                        </div>

                        {
                            preferenceId && <Wallet locale='es-CL' initialization={{ preferenceId }} />
                        }
                    </div>    
                    
                    
                </article>

            </section>
                
        </>
    )
}
