import { EventoProps } from '../../../domain/interfaces/interfaceProps/IEventoProps';
import { Evento } from '../../../domain/entities/Evento';
import { environment } from '../../../environment/environment.dev';
import { Buffer } from 'buffer';
import { basicAuth } from '../../../types/basicAuth';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/loader/Loader';
import axios from 'axios';
import './EventReferencialMap.css';

const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;
const URL_GET_LUGAR = environment.UrlLugares;

export const EventReferencialMap: React.FC<EventoProps> = ({evento}) => {
    const [ imageLugar, setImageLugar] = useState('');
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        fetchLugar(evento);
    }, []);

    const fetchLugar = async (eventoParam: Evento) => {
        try {
            setLoading(true);
            let {data} = await axios.get(URL_GET_LUGAR + `/${eventoParam.idLugar}`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                }
            });
            let datos = data.data;
            setImageLugar(datos.mapaReferencial);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <center className='referencial-container'>
            {
                loading === true ? <Loader /> :
                <picture>
                    <img src={imageLugar} style={{height: '200px'}} alt='Mapa Referencial'/> 
                </picture>
            }
        </center>
    )
}
