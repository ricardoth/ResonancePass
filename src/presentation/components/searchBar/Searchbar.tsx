import { useState } from 'react';
import { environment } from '../../../environment/environment.dev';
import { basicAuth } from '../../../types/basicAuth';
import { Buffer } from 'buffer';
import axios from 'axios';
import Select from 'react-select'; 
import './Searchbar.css';
import { Evento } from '../../../domain/entities/Evento';
import { Option } from './Option';
import { useNavigate } from 'react-router-dom';

const URL_GET_EVENTOS_FILTER = environment.UrlEventos + "/GetEventosFilter";
const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;

export const Searchbar = () => {
    const navigate = useNavigate();
    const [ eventSelected, setEventSelected] = useState(0);
    const [ inputValue, setInputValue ] = useState("");
    const [ options, setOptions ] = useState([]);

    const fetchEventos = async (inputValue: string) => {
        try {
            let response = await axios.get(URL_GET_EVENTOS_FILTER + `?filtro=${inputValue}`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                },
            });
            if(response.status === 200) {
                const { data } = response.data;
                const newOptions = data.map((item: Evento) => ({
                    value: item.idEvento,
                    label: item.nombreEvento + ' - ' + item.lugar?.nombreLugar,
                    image: item.contenidoFlyer,
                    evento: item
                }));
                setOptions(newOptions);
            } 
        } catch (error: any) {
            console.log(error)
        }
    }

    const handleInputChange = async (inputValue: string) => {
        setInputValue(inputValue);
        if (inputValue.length >= 3) 
            await fetchEventos(inputValue);
       
        return inputValue;
    }

    const onSelectedEvent = (valueEvent: any) => {
        if(valueEvent !== null) {
            setEventSelected(valueEvent.value);
            let eventDetails: Evento = valueEvent.evento;
            const paramRoute = eventDetails.nombreEvento.toLocaleLowerCase().replace(/ /g, '-').replace('---', '-');

            navigate(`/eventos/${paramRoute}`, {
                state: { eventDetails }
            });
        } else {
            setOptions([]);
        }
    }

    return (
        <>
            <div className="d-flex justify-content-center flex-grow-1 pe-3 form-search">
                <div className='input-icon-container'>
                    <Select 
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={eventSelected}
                        onChange={(option: any) => onSelectedEvent(option)}
                        styles={{ container: (base) => ({ ...base, width: 300 }) }}
                        onInputChange={handleInputChange}
                        components={{ Option }}
                        isClearable={true}
                        inputValue={inputValue}
                        options={options}
                        placeholder="Buscar Evento, Artista o Lugar"
                        noOptionsMessage={({ inputValue }) =>   inputValue.length > 0
                                                                ? "No se encontraron eventos"
                                                                : "No hay opciones disponibles" }
                    />
                    
                </div>
            </div>
        </>
    )
}
