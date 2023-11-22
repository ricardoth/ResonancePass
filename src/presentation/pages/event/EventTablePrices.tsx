import { useEffect, useState } from 'react';
import { environment } from '../../../environment/environment.dev';
import { basicAuth } from '../../../types/basicAuth';
import { Buffer } from 'buffer';
import './EventTablePrices.css';
import axios from 'axios';
import { Sector } from '../../../domain/entities/Sector';

const URL_GET_SECTORS_BY_EVENT = environment.UrlGetSectoresByEvento;
const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;

interface EventTableProps {
    evento: number;
}

export const EventTablePrices: React.FC<EventTableProps> = ({evento}) => {
    const [ sectores, setSectores] = useState([]);

    useEffect(() => {
        fetchSectores(evento);
    }, [])
    

    const fetchSectores = async (id: number) => {

        try {
            let {data} = await axios.get(URL_GET_SECTORS_BY_EVENT + `${id}`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                }
            });
            let datos = data.data;
            setSectores(datos);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">
            <table className="table table-bordered">
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
                                    <th scope="row" className="text-white texto-border">{row.idSector}</th>
                                    <td className="text-white texto-border">{row.precio}</td>
                                    <td className="text-white texto-border">Otto</td>
                                    <td className="text-white texto-border">@mdo</td>
                                </tr>
                            )
                        })

                    }
                    {/* <tr>
                        <th scope="row" className="text-white texto-border">1</th>
                        <td className="text-white texto-border">Mark</td>
                        <td className="text-white texto-border">Otto</td>
                        <td className="text-white texto-border">@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-white texto-border">2</th>
                        <td className="text-white texto-border">Mark</td>
                        <td className="text-white texto-border">Otto</td>
                        <td className="text-white texto-border">@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-white texto-border">3</th>
                        <td className="text-white texto-border">Mark</td>
                        <td className="text-white texto-border">Otto</td>
                        <td className="text-white texto-border">@mdo</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}
