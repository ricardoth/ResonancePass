import { useLocation } from "react-router-dom"
import { useEffect } from 'react';
import './ShopTicket.css';
import { NavbarEvent } from "../../components/navbar/NavBarEvent";
import { Evento } from "../../../domain/entities/Evento";
import { formatDateLocaleString, getHourEvent } from "../../../utils/formatDateOption";

export const ShopTicket = () => {
    const location = useLocation();
    const eventState: Evento = location.state?.eventDetails;

    useEffect(() => {
        console.log(location)
    }, []);
    

    return (
        <>
            <NavbarEvent />
            <section className="shop-ticket-container">
                <article className="info-evento-container">
                    <div className="row info-evento-box">
                        <h4><strong>Tu Compra</strong></h4>
                        <div className="col-lg-4">
                            <h6><strong>Evento</strong></h6>

                            <p>{eventState.nombreEvento}</p>
                        </div>
                       
                        <div className="col-lg-4">
                            <h6><strong>Lugar</strong></h6>
                            <p>{eventState.lugar?.nombreLugar} {eventState.lugar?.numeracion}</p>
                        </div>

                        <div className="col-lg-4">
                            <h6><strong>Fecha</strong></h6>
                            <p><i className="bi bi-calendar3"></i> {formatDateLocaleString(eventState.fecha)} - {getHourEvent(eventState.fecha)} Hrs.</p>
                        </div>
                    </div>
                </article>
            </section>
        </>
        
    )
}
