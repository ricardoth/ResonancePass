import { useState, useContext } from 'react';
import { useLocation, useNavigate } from "react-router-dom"
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
import { openPdfWindow } from '../../../utils/pdfBlobOption';
import { Loader } from '../../components/loader/Loader';

const CURRENCY_CLP = 'CLP';
const URL_GENERAR_TICKETS = environment.UrlGenerarTicket;
const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;

export const ConfirmShop = () => {
    const { loginState } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [ radioValue, setRadioValue ] = useState(0);
    const [ loading, setLoading ] = useState(false);

    const tickets = location.state?.ticketDetails;
    const total: number = location.state?.sumTotal;
    const eventDetails = location.state?.evento;

    const handleGenerateTickets = async () => {
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

        /** AQUI SE DEBE REDIRIGIR A PLATAFORMAS DE PAGO WEBPAY, MERCADO PAGO, ETC -- O BIEN DESDE LA API AL MOMENTO DE GENERAR, INTEGRAR PLATAFORMA DE PAGO */

        try {
            setLoading(true);
            let response = await axios.post(URL_GENERAR_TICKETS, ticketList, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                }
            });

            if (response.status === 200) {
                toast.success('Se han generado los tickets correctamente');
                openPdfWindow(response.data);
                //Redirección a mis tickets
                navigate('/misTickets', {
                    replace: true
                })
            } else {
                toast.error(response.data);
            }
            setRadioValue(0);
            setLoading(false);
        } catch (error: any) {
            toast.error(error.response.data.Message);
            setRadioValue(0);
            setLoading(false);
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
                {
                    loading ? <Loader /> :
                    <>
                        <div id="panel-shop-account">
                            <WayToPay radioValue={radioValue} setRadioValue={setRadioValue} />
                        </div>

                        <div className="container">
                            <hr/> 
                            <div className="row g-2">
                                <div className="col-auto">
                                    <h6><strong>Total</strong></h6>
                                </div>
                                <div className="col-auto">
                                    <p><strong>{formatCurrency(total, CURRENCY_CLP)}</strong></p>
                                </div>
                                <button type='button' className="btn btn-warning" onClick={handleGenerateTickets} disabled={radioValue <= 0}>Generar Compra</button>
                            </div>
                        </div>    
                    </>
                }
                </article>
            </section>
                
        </>
    )
}
