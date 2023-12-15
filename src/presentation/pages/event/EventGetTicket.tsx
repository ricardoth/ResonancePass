import { useNavigate } from 'react-router-dom';
import { EventoProps } from '../../../domain/interfaces/interfaceProps/IEventoProps';
import { Evento } from '../../../domain/entities/Evento';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import './EventGetTicket.css';

export const EventGetTicket: React.FC<EventoProps> = ({evento}) => {
    const navigate = useNavigate();
    const { loginState } = useContext(AuthContext);
    
    const handleGetTicket = (eventDetails: Evento) => {
        const paramRoute = eventDetails.nombreEvento.toLocaleLowerCase().replace(/ /g, '-').replace('---', '-');
        if (loginState.logged) {
            navigate(`/carro/${paramRoute}`, {
                state: [ eventDetails ]
            });
        } else {
            navigate('/login', {
                state: { eventDetails }
            });
        }
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
