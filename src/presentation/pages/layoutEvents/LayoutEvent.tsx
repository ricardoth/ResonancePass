import { Buffer } from 'buffer';
import { environment } from '../../../environment/environment.dev';
import { basicAuth } from '../../../types/basicAuth';
import { Evento } from '../../../domain/entities/Evento';
import axios from 'axios';
import './LayoutEvent.css';
import { useState, useEffect } from 'react';
import { formatDateLocaleString } from '../../../utils/formatDateOption';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/footer/Footer';
import { CarouselEvent } from '../../components/carouselEvent/CarouselEvent';
import { Navbar } from '../../components/navbar/Navbar';

const URL_GET_EVENTOS = environment.UrlEventos;
const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;

export const LayoutEvent = () => {
    const navigate = useNavigate();
    const [ eventos, setEventos] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const fetchEventos = async () => {
        try {
            setLoading(true);
            let response = await axios.get(URL_GET_EVENTOS, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                }
            });
            let {data} = response.data;
            let datos = data;
            let eventosActivos = datos.filter((ev: Evento) => ev.activo === true);
            setEventos(eventosActivos);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEventos();
    }, []);

    const handleBuyTicket = (eventDetails: Evento) => {
        navigate('/eventScreen', {
            state: { eventDetails }
        });
    }
    
    return (
        <>
        <Navbar />
        <CarouselEvent />
            <div className="flex-container">
            {
                eventos.map((row: Evento) => (
                    <div className="flex-items animate__animated animate__zoomIn" key={row.idEvento}>
                        <div className="card" key={row.idEvento}>
                            <img className='card-img-top image-flyer' src={row.contenidoFlyer}/>
                            <div className="card-body">
                                <h5 className="card-title"><strong>{row.nombreEvento}</strong></h5>
                                <p className="card-text calendar"><i className='bi bi-calendar3'></i> {formatDateLocaleString(row.fecha)} </p>
                                <p className='card-text'><i className='bi bi-geo-alt-fill'></i> {row.lugar?.nombreLugar}</p>
                                <button className='btn btn-warning btn-lg' onClick={() => handleBuyTicket(row)}>Comprar Tickets</button>
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
            <br/>
            {
                !loading && (
                    <Footer/>
                ) 
            }
        </>
    )
}
