import { Evento } from "../../../domain/entities/Evento";
import { getYearNow } from "../../../utils/formatDateOption";
import './EventFooter.css';

interface EventTableProps {
    evento: Evento;
}

export const EventFooter: React.FC<EventTableProps> = ({evento}) => {
    return (
        <footer className="text-center text-lg-start footer-container">
            <div className="text-center p-3 border-top border-white text-white">
                <h5 className="text-white">Produce: {evento.productoraResponsable} </h5>
                <p className="text-white"> © { getYearNow() } Resonance Pass</p>
            </div>
        </footer>
    )
}
