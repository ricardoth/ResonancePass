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
import { toast } from 'react-toastify';
import { Meta } from '../../../domain/valueObjects/Meta';
import { Loader } from '../../components/loader/Loader';
import { LoaderFullScreen } from '../../components/loader/LoaderFullScreen';

const URL_GET_EVENTOS = environment.UrlEventos + "/GetEventosPagination";
const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;

export const LayoutEvent = () => {
    const navigate = useNavigate();
    const [ eventos, setEventos] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ page, setPage ] = useState(1);
    const [ meta, setMeta ] = useState<Meta>({} as Meta);
    const totalPages = [];

    const fetchEventos = async (page: number, row: number = 9) => {
        try {
            setLoading(true);
            let response = await axios.get(`${URL_GET_EVENTOS}?PageSize=${row}&PageNumber=${page}`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                }
            })

            if(response.status === 200) {
                let {data, meta} = response.data;
                setEventos(data);
                setMeta(meta);
               
            } else {
                toast.error("Ha ocurrido un error");
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Ha ocurrido un error");
        }
    }

    useEffect(() => {
        fetchEventos(page);
    }, [page]);

    if ( loading ) return <><Navbar/><LoaderFullScreen /></>;

    const handleBuyTicket = (eventDetails: Evento) => {
        const paramRoute = eventDetails.nombreEvento.toLocaleLowerCase().replace(/ /g, '-').replace('---', '-');
        navigate(`/eventos/${paramRoute}`, {
            state: { eventDetails }
        });
    }

    const handlePageChange = (page: number) => {
        window.scroll(0, 0);
        setPage(page);
    }

    for (let i = 1; i <= meta.totalPages; i++) {
        totalPages.push(
            <div key={i}>
                <li className="page-item">
                    <button className='btn btn-warning' onClick={() => handlePageChange(i)}>{i}</button>&nbsp;
                </li>
            </div>
        );
    }
    
    return (
        <>
        <Navbar />
        <CarouselEvent />
            <div className="flex-container">
            {
                eventos.map((row: Evento) => {
                    const backgroundImage = `url('${row.contenidoFlyer} ')`;

                    return (
                        <div className="flex-items animate__animated animate__zoomIn" key={row.idEvento}>
                            <div className='card' key={row.idEvento}>
                                <div className='card-img-top image-flyer' style={{backgroundImage}}></div>

                                <div className="card-body">
                                    <h5 className="card-title"><strong>{row.nombreEvento}</strong></h5>
                                    <p className="card-text calendar"><i className='bi bi-calendar3'></i> {formatDateLocaleString(row.fecha)} </p>
                                    <p className='card-text'><i className='bi bi-geo-alt-fill'></i> {row.lugar?.nombreLugar}</p>
                                    <button className='btn btn-warning btn-lg' onClick={() => handleBuyTicket(row)}>Comprar Tickets</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
            <br/>
            <section className='pagination-layout-events'>
                <nav>
                    <ul className="pagination pagination-lg justify-content-center">
                        {
                            meta.totalPages === 0 ? '' :
                            totalPages
                        }
                    </ul>
                </nav>
            </section>
            
            <br/>
            {
                !loading && (
                    <Footer/>
                ) 
            }
        </>
    )
}
