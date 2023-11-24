import { useLocation } from 'react-router-dom';
import { Navbar } from '../../components/navbar/Navbar';
import { EventFooter } from './EventFooter';
import { formatDateLocaleString, getHourEvent } from '../../../utils/formatDateOption';
import { Evento } from '../../../domain/entities/Evento';
import { EventTablePrices } from './EventTablePrices';
import { EventReferencialMap } from './EventReferencialMap';
import './EventScreen.css';
import { EventGetTicket } from './EventGetTicket';

export const EventScreen = () => {
    const location = useLocation();
    const eventState: Evento = location.state?.eventDetails;
    const backgroundImage = `url('data:image/jpeg; base64, ${eventState.contenidoFlyer} ')`;

    return (
        <>
            <Navbar />
                <div className='img-container' style={{ backgroundImage,  maxWidth: '100%', height: '140vh', backgroundSize: 'cover'}}>
                    <div className='info-evento'>
                        <h1 className='display-4 text-white texto-border'>{formatDateLocaleString(eventState.fecha)}</h1>
                        <h3 className='display-6 text-white texto-border'>{eventState.lugar?.nombreLugar} - {getHourEvent(eventState.fecha)}</h3>
                    </div>
                </div>

            <EventReferencialMap evento={eventState} />
            <EventTablePrices evento={eventState}/> 
            <EventGetTicket evento={eventState} />
            {/* Descripción observacion evento */}
            {/*Productora a cargp*/}
            <EventFooter evento={eventState} /> 
        </>
        
    )
}


  