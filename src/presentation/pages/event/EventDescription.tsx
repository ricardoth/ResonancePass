import { EventoProps } from "../../../domain/interfaces/interfaceProps/IEventoProps";
import './EventDescription.css';

export const EventDescription : React.FC<EventoProps> = ({evento}) => {
    return (
        <center className="container-description">
            <div className="col-lg-12 text-justify centro-info-description animate__animated animate__fadeInDown">
                <h4 className="text-white text-center">{evento.descripcion}</h4>
                <p className="text-white text-center">
                    {evento.observacion}
                </p>
                <br/>
                <br/>
                <br/>
            </div>
        </center>
    )
}
