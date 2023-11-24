import { Evento } from '../../../domain/entities/Evento';
import './EventGetTicket.css';

interface EventGetTicketProps {
    evento: Evento
}

export const EventGetTicket: React.FC<EventGetTicketProps> = ({evento}) => {
    const handleGetTicket = () => {
        console.log("Quiero mi ticket")
    }

    return (
        <center className="center-info-event">
            <div>
                <h3 style={{color: 'white'}}>Obtén tu ticket para ver {evento.nombreEvento} en {evento.lugar?.nombreLugar}</h3>
                <button className='btn btn-outline-light btn-lg' onClick={handleGetTicket}><i className="bi bi-ticket-detailed-fill"></i> COMPRAR TICKET </button>
            </div>
        </center>
    )
}
