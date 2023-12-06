import { useState } from 'react';
import { useLocation } from "react-router-dom"
import { NavbarEvent } from "../../components/navbar/NavBarEvent";
import { formatCurrency } from "../../../types/currency";
import { formatDateHour } from '../../../utils/formatDateOption';
import './ConfirmShop.css';
import { WayToPay } from './WayToPay';
import { BuyerData } from './BuyerData';

const CURRENCY_CLP = 'CLP';

export const ConfirmShop = () => {
    const location = useLocation();
    const [ tickets, setTickets ] = useState(location.state?.ticketDetails);
    const [ total, setTotal ] = useState(location.state?.sumTotal);
    const [ eventDetails, setEventDetails ] = useState(location.state?.evento);

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

            <section className="section-buyer">
                <article className="info-evento-container">
                    <div id='panel-form-buyer'>
                        <BuyerData />
                    </div>
                </article>
            </section>

            <section className="section-confirm-panel">
                <article className="info-evento-container">
                    <div id="panel-shop-account">
                        <WayToPay />
                    </div>
                </article>
            </section>

        </>
    )
}
