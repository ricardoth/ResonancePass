import { useLocation } from 'react-router-dom';
import { EventFooter } from './EventFooter';
import { formatDateLocaleString, getHourEvent } from '../../../utils/formatDateOption';
import { Evento } from '../../../domain/entities/Evento';
import { EventTablePrices } from './EventTablePrices';
import { EventReferencialMap } from './EventReferencialMap';
import { EventGetTicket } from './EventGetTicket';
import './EventScreen.css';
import { NavbarEvent } from '../../components/navbar/NavBarEvent';

export const EventScreen = () => {
    const location = useLocation();
    const eventState: Evento = location.state?.eventDetails;
    const backgroundImage = `${eventState.contenidoFlyer}`;

    return (
        <>
            <NavbarEvent />
            <section className='content-event-flyer animate__animated animate__fadeIn'>
                <picture className='container-image'>
                    <img className='image-flyer' src={backgroundImage}/>
                </picture>

                <section className='content-head-event'>
                    <div className='info-evento'>
                        <h3 className='text-white texto-border'><strong>{eventState.nombreEvento}</strong></h3>
                        <h5 className='text-white texto-border'><i className="bi bi-calendar3"></i> {formatDateLocaleString(eventState.fecha)} - {getHourEvent(eventState.fecha)} Hrs.</h5>
                    </div>
                    <div className="icono-y-texto">
                        <h4 className='text-white texto-border'><i className="bi bi-geo-alt-fill"></i> {eventState.lugar?.nombreLugar}</h4>
                        <p className='text-white texto-border'>{eventState.lugar?.ubicacion} {eventState.lugar?.numeracion}</p>
                    </div>

                    <div className='info-observacion'>
                        <div className="col-lg-12 animate__animated animate__fadeInDown">
                            <h4 className="text-white text-center">{eventState.descripcion}</h4>
                            <p className="text-white text-center">
                                {eventState.observacion}
                            </p>
                        </div>
                    </div>
                </section>
            </section>

            <EventReferencialMap evento={eventState} />
            <EventTablePrices evento={eventState}/> 
            <EventGetTicket evento={eventState} />
            <EventFooter evento={eventState} /> 
        </>
    )
}


  