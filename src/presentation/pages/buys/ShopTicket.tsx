import { useLocation } from "react-router-dom"
import { useEffect } from 'react';
import './ShopTicket.css';
import { NavbarEvent } from "../../components/navbar/NavBarEvent";
import { formatDateLocaleString, getHourEvent } from "../../../utils/formatDateOption";
import { ChooseSector } from "./ChooseSector";

export const ShopTicket = () => {
    const location = useLocation();
    const {eventDetails, email} = location.state?.payload;

    useEffect(() => {
     
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
                            <p>{eventDetails.nombreEvento}</p>
                            <img src={eventDetails.contenidoFlyer} width={100}/>
                        </div>
                       
                        <div className="col-lg-4">
                            <h6><strong>Lugar</strong></h6>
                            <p>{eventDetails.lugar?.nombreLugar} {eventDetails.lugar?.numeracion}</p>
                        </div>

                        <div className="col-lg-4">
                            <h6><strong>Fecha</strong></h6>
                            <p><i className="bi bi-calendar3"></i> {formatDateLocaleString(eventDetails.fecha)} - {getHourEvent(eventDetails.fecha)} Hrs.</p>
                        </div>
                    </div>
                </article>
            </section>
           
            <ChooseSector evento={eventDetails}/> 
        </>
        
    )
}
