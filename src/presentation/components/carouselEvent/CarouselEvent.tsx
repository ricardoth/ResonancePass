import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { environment } from '../../../environment/environment.dev';
import { basicAuth } from '../../../types/basicAuth';
import { Loader } from '../loader/Loader';
import { formatDateHour } from '../../../utils/formatDateOption';
import axios from 'axios';
import './CarouselEvent.css';
import { useNavigate } from 'react-router-dom';

const URL_GET_EVENTOS = environment.UrlEventos;
const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;

export const CarouselEvent = () => {
    const [ eventos, setEventos ] = useState([]);
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        fetchEventos();
    }, [])
    
    const fetchEventos = async () => {
        try {
            setLoading(true);
            let {data} = await axios.get(URL_GET_EVENTOS, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                }
            });
            let datos = data.data;
            setEventos(datos);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    const handleNavigateEvent = (rowParam: any) => {
        navigate('/eventScreen', {
            state: { rowParam }
        })
    }

    return (
        <>
            <div id="carouselExampleCaptions" className="carousel slide">
                <div className="carousel-indicators">
                {
                    eventos.map( (row: any, index: any) => {
                        return (
                            <button type="button" key={index} data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} className="active" aria-current="true"  aria-label= {`Slide ${index}`}></button>
                        )
                    })
                }
                </div>

                    <div className="carousel-inner">
                    {
                        loading ? <Loader /> :
                        eventos.map( (row: any) => {
                            if(row.idEvento === 1) {
                                return (
                                    <div key={row.idEvento} className="carousel-item active">
                                        <img src={`data:image/jpeg;base64, ${row.contenidoFlyer}`} className="d-block w-100" alt="..." />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5 className='texto-border'>{row.nombreEvento}</h5>
                                            <p className='texto-border'>Fecha: {formatDateHour(row.fecha)}</p>
                                            <p className='texto-border'>Lugar: {row.lugar.nombreLugar}</p>
                                            <button key={row.idEvento} onClick={() => handleNavigateEvent(row)} className='btn btn-outline-light btn-lg'>Ver Más</button> 
                                        </div> 
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={row.idEvento} className="carousel-item">
                                        <img src={`data:image/jpeg;base64, ${row.contenidoFlyer}`} className="d-block w-100" alt="..." />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5 className='texto-border'>{row.nombreEvento}</h5>
                                            <p className='texto-border'>Fecha: {formatDateHour(row.fecha)}</p>
                                            <p className='texto-border'>Lugar: {row.lugar.nombreLugar}</p>
                                            <button key={row.idEvento} onClick={() => handleNavigateEvent(row)} className='btn btn-outline-light btn-lg'>Ver Más</button>
                                        </div> 
                                    </div>
                                )
                            }
                            
                        })
                    }
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
            </div>
        </>
    )
}
