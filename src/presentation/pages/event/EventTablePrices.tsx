import { useEffect, useState } from 'react';
import { environment } from '../../../environment/environment.dev';
import { basicAuth } from '../../../types/basicAuth';
import { Buffer } from 'buffer';
import { Sector } from '../../../domain/entities/Sector';
import { Evento } from '../../../domain/entities/Evento';
import { formatCurrency } from '../../../types/currency';
import { Loader } from '../../components/loader/Loader';
import { EventoProps } from '../../../domain/interfaces/interfaceProps/IEventoProps';
import axios from 'axios';
import './EventTablePrices.css';

const URL_GET_SECTORS_BY_EVENT = environment.UrlGetSectoresByEvento;
const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;
const CURRENCY_CLP = 'CLP';

export const EventTablePrices: React.FC<EventoProps> = ({evento}) => {
    const [ sectores, setSectores] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        fetchSectores(evento);
    }, []);

    const fetchSectores = async (evento: Evento) => {
        try {
            setLoading(true);
            let {data} = await axios.get(URL_GET_SECTORS_BY_EVENT + `${evento.idEvento}`, {
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

    return (
        <>
            <div className="content">
            {
                loading ? <Loader /> : 
                <>
                    <table className="table border-light sector-table">
                        <thead>
                            <tr>
                                <th scope="col" className="text-white texto-border">Sector</th>
                                <th scope="col" className="text-white texto-border">Precio</th>
                                <th scope="col" className="text-white texto-border">Cargo</th>
                                <th scope="col" className="text-white texto-border">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            
                                sectores.map((row: Sector) => {
                                    return (
                                        <tr key={row.idSector}>
                                            <th scope="row" className="text-white texto-border"> <i className="bi bi-arrow-right-circle-fill" style={{color: row.colorHexa}}></i>  {row.nombreSector}</th>
                                            <td className="text-white texto-border">{formatCurrency(row.precio, CURRENCY_CLP)}</td>
                                            <td className="text-white texto-border">{formatCurrency(row.cargo, CURRENCY_CLP)}</td>
                                            <td className="text-white texto-border">{formatCurrency(row.total, CURRENCY_CLP)}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </>
            }
            </div>


            <div className='text-table-info'>
                <p className='text-white texto-border'>* Toda Persona que ingrese al recinto debe tener su entrada</p>
            </div>
        </>
    )
}
