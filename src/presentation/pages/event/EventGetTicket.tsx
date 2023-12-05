import { useNavigate } from 'react-router-dom';
import { EventoProps } from '../../../domain/interfaces/interfaceProps/IEventoProps';
import { Evento } from '../../../domain/entities/Evento';
import './EventGetTicket.css';

export const EventGetTicket: React.FC<EventoProps> = ({evento}) => {
    const navigate = useNavigate();

    const handleGetTicket = (eventDetails: Evento) => {
        navigate('/carro',{
            state: { eventDetails }
        });
    }

    return (
        <center className="center-info-event">
            <div>
                <h3 className='text-white'>Obtén tu ticket para ver {evento.nombreEvento} en {evento.lugar?.nombreLugar}</h3>
                <button className='btn btn-outline-light btn-lg' onClick={() => handleGetTicket(evento)}><i className="bi bi-ticket-detailed-fill"></i> COMPRAR TICKET </button>
            </div>
        </center>
    )
}
