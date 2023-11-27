import { EventoProps } from '../../../domain/interfaces/interfaceProps/IEventoProps';
import './EventGetTicket.css';

export const EventGetTicket: React.FC<EventoProps> = ({evento}) => {

    const handleGetTicket = () => {
        console.log("Quiero mi ticket")
    }

    return (
        <center className="center-info-event">
            <div>
                <h3 className='text-white'>Obtén tu ticket para ver {evento.nombreEvento} en {evento.lugar?.nombreLugar}</h3>
                <button className='btn btn-outline-light btn-lg' onClick={handleGetTicket}><i className="bi bi-ticket-detailed-fill"></i> COMPRAR TICKET </button>
            </div>
        </center>
    )
}
