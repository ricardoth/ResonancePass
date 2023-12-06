import { environment } from "../../../environment/environment.dev";
import { Buffer } from 'buffer';
import axios from "axios";
import { basicAuth } from "../../../types/basicAuth";
import { useEffect, useState } from "react";
import { MedioPago } from "../../../domain/entities/MedioPago";
import './WayToPay.css';
import { Loader } from "../../components/loader/Loader";

const URL_MEDIO_PAGO = environment.UrlMedioPago;
const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;

export const WayToPay = () => {
    const [ mediosPagos, setMediosPagos] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const fetchMediosPagos = async () => {
        try {
            setLoading(true);
            let {data} = await axios.get(URL_MEDIO_PAGO, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                }
            });
            let datos = data.data;
            setMediosPagos(datos);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMediosPagos();
    }, []);

    return (
        <div className="container-medio-pago mt-2">
            <h5><strong>Selecciona tu forma de pago</strong></h5>
            {
                loading ? <Loader /> : 
                mediosPagos.map((mp: MedioPago) => (
                    <div className="contenedor-pasarela">
                        <input className="form-check-input mt-2" type="radio" name="listGroupRadio" value={mp.idMedioPago} id="firstRadio" />
                        &nbsp; 
                        <label className="form-check-label" htmlFor={`${mp.idMedioPago}`}> {mp.nombreMedioPago} </label>
                        &nbsp; &nbsp;
                        <img src={mp.urlImageBlob} width={450} height={55}/>
                    </div>

                ))
            }
        </div>
    )
}
