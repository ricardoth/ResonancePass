import axios from "axios";
import { environment } from '../../../environment/environment.dev';
import { basicAuth } from '../../../types/basicAuth';
import { Buffer } from 'buffer';
import { Evento } from "../../../domain/entities/Evento";
import { Sector } from '../../../domain/entities/Sector';
import { useState, useEffect } from 'react';
import { EventoProps } from "../../../domain/interfaces/interfaceProps/IEventoProps";
import { formatCurrency } from "../../../types/currency";
import './ChooseSector.css';
import { Loader } from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const URL_GET_SECTORES_BY_EVENT = environment.UrlGetSectoresByEvento;
const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;
const CURRENCY_CLP = 'CLP';

export const ChooseSector: React.FC<EventoProps> = ({evento}) => {
    const navigate = useNavigate();
    const [ sectores, setSectores ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ seleccionSectores, setSeleccionSectores ] = useState([]);

    const fetchSectores = async (evento: Evento) => {
        try {
            setLoading(true);
            let {data} = await axios.get(URL_GET_SECTORES_BY_EVENT + `${evento.idEvento}`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                }
            });
            let datos = data.data;
            let sectoresActivos = datos.filter((sec: Sector) => sec.activo);
            setSectores(sectoresActivos);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    useEffect(() => {
        setSeleccionSectores([]);
    }, [sectores]);

    useEffect(() => {
        fetchSectores(evento);
    }, []);

    const handleChangeSelect = ({target}: any, idSector: number) => {
        const nuevaCantidad = parseInt(target.value, 10);

        setSeleccionSectores(prevSeleccion => {
            const index = prevSeleccion.findIndex((item: Sector) => item.idSector === idSector);

            if (nuevaCantidad > 0) {
                if (index > -1) {
                    const nuevaSeleccion: any = [...prevSeleccion];
                    nuevaSeleccion[index] = {...nuevaSeleccion[index], cantidad: nuevaCantidad };
                    return nuevaSeleccion;
                } else {
                    return [...prevSeleccion, { idSector, cantidad: nuevaCantidad }];
                }
            } else {
                if (index > -1) {
                    return prevSeleccion.filter((item: Sector) => item.idSector !== idSector);
                }
            }
        });
    }

    const calculateTickets = () => {
        const tickets: any[]= [];

       seleccionSectores.map((sec: Sector) => {
            const selectedSector = sectores.filter((st: Sector) => st.idSector == sec.idSector);
            tickets.push(selectedSector);
        })
        console.log(tickets)



        //proceder a Formas de Pago y luego confirmación
        //Envía parámetros por useLocation react-router-dom
        
        // navigate('/confirmShop', {
        //     state: { seleccionSectores }
        // });
    }

    return (
        <>
            {
            loading ? <Loader/> :
            <section className="sector-container">
                <div id="table-container-sector">
                    <table id="table-sector" className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">TICKET</th>
                                <th scope="col">PRECIO</th>
                                <th scope="col">CANTIDAD</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                            sectores.map((sec: Sector) => (
                                
                                <tr key={sec.idSector}>
                                    <td><i className="bi bi-arrow-right-circle-fill" style={{color: sec.colorHexa}}></i> </td>
                                    <td className="cell-sector"> 
                                        { sec.capacidadDisponible <= 0 ?
                                            ( <del>{sec.nombreSector}</del> ) 
                                            : sec.nombreSector
                                        }
                                    </td>
                                    <td className="cell-total">
                                        {
                                             sec.capacidadDisponible <= 0 ?
                                             (<del>{formatCurrency(sec.total, CURRENCY_CLP)}</del>)
                                             :
                                             formatCurrency(sec.total, CURRENCY_CLP)
                                        }
                                    </td>
                                    <td className="cell-cantidad">
                                        <select 
                                            id={`idCantidadSector${sec.idSector}`}
                                            className="form-select input-cantidad"
                                            name="cantidadTickets"
                                            disabled={sec.capacidadDisponible <= 0}
                                            onChange={(e) => handleChangeSelect(e, sec.idSector)}
                                        >
                                            <option value={0}>0</option>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    <div className="confirm-button">
                        <div className="d-grid gap-2">
                            <button className="btn btn-warning btn-confirm" onClick={calculateTickets} disabled={seleccionSectores.length <= 0} >Confirmar</button>
                        </div>
                        
                    </div>
                </div>
            </section>
            }
        </>
    )
}
