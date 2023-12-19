import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { environment } from '../../../environment/environment.dev';
import { basicAuth } from '../../../types/basicAuth';
import { formatDateHour } from '../../../utils/formatDateOption';
import { useNavigate } from 'react-router-dom';
import { Evento } from '../../../domain/entities/Evento';
import { LoaderFullScreen } from '../loader/LoaderFullScreen';
import axios from 'axios';
import './CarouselEvent.css';

const URL_GET_EVENTOS = environment.UrlEventos;
const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;

export const CarouselEvent = () => {
    const [ eventos, setEventos ] = useState([]);
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        fetchEventosCarrousel();
    }, [])
    
    const fetchEventosCarrousel = async () => {
        try {
            setLoading(true);
            let response = await axios.get(URL_GET_EVENTOS, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                }
            });
            let {data} = response.data;
            let datos = data;
            let eventosActivos = datos.filter((ev: Evento) => ev.activo === true && ev.banner === true);
            setEventos(eventosActivos);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handleNavigateEvent = (eventDetails: Evento) => {
        const paramRoute = eventDetails.nombreEvento.toLocaleLowerCase().replace(/ /g, '-').replace('---', '-');
        navigate(`/eventos/${paramRoute}`, {
            state: { eventDetails }
        });
    }

    return (
        <>
            <div id="carouselExampleCaptions" className="carousel slide">
                <div className="carousel-indicators">
                {
                    loading ? '' :
                    eventos.map( (row: Evento, index: number) => {
                        return (
                            <button type="button" key={index} data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} className="active" aria-current="true"  aria-label= {`Slide ${row.idEvento}`}></button>
                        )
                    })
                }
                </div>

                <div className="carousel-inner">
                {
                    loading ? <LoaderFullScreen /> :
                    eventos.map( (row: Evento, index: number) => {
                        const backgroundImage = `url('${row.contenidoFlyer} ')`;
                        if(index === 0) {
                            return (
                                <div key={row.idEvento} className="carousel-item active">
                                    <div className='carrousel-image-container d-block w-100' style={{backgroundImage}}>
                                        <div className="carousel-caption">
                                            <h2 className='texto-border'>{row.nombreEvento}</h2>
                                            <h4 className='texto-border'>Fecha: {formatDateHour(row.fecha)}</h4>
                                            <h4 className='texto-border'>Lugar: {row.lugar?.nombreLugar}</h4>
                                            <button key={row.idEvento} onClick={() => handleNavigateEvent(row)} className='btn btn-outline-light btn-lg'>Ver Más</button> 
                                        </div> 
                                    </div> 
                                </div>
                            )
                        } else {
                            return (
                                <div key={row.idEvento} className="carousel-item">
                                    <div className='carrousel-image-container' style={{backgroundImage}}>
                                        <div className="carousel-caption">
                                            <h2 className='texto-border'>{row.nombreEvento}</h2>
                                            <h4 className='texto-border'>Fecha: {formatDateHour(row.fecha)}</h4>
                                            <h4 className='texto-border'>Lugar: {row.lugar?.nombreLugar}</h4>
                                            <button key={row.idEvento} onClick={() => handleNavigateEvent(row)} className='btn btn-outline-light btn-lg'>Ver Más</button>
                                        </div> 
                                    </div> 
                                    
                                </div>
                            )
                        }
                        
                    })
                }
                </div>

                {
                    loading ? '' :
                    <>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </>
                }
                
            </div>
        </>
    )
}
