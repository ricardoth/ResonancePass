import './EventReferencialMap.css';
import { Evento } from '../../../domain/entities/Evento';

interface ReferencialMapProps {
    evento: Evento;
}

export const EventReferencialMap: React.FC<ReferencialMapProps> = ({evento}) => {
    const { lugar } = evento;
    const backgroundImage = `data:image/png; base64, ${lugar?.mapaReferencial}`;

    return (
        <center className='referencial-container'>
            <img src={backgroundImage} style={{height: '200px'}} alt='Mapa Referencial'/>
        </center>
    )
}
