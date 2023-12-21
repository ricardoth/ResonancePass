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

interface WayPayRadioProps {
    radioValue: number,
    setRadioValue: React.Dispatch<React.SetStateAction<number>>
}

export const WayToPay: React.FC<WayPayRadioProps> = ({radioValue, setRadioValue}) => {
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

    const handleRadioPayWay = (paramIdMedioPago: number) => {
        setRadioValue(paramIdMedioPago);
    }

    return (
        <div className="container-medio-pago mt-5">
            <h5><strong>Forma de Pago</strong></h5>
            {
                loading ? <Loader /> : 
                mediosPagos.map((mp: MedioPago) => (
                    <div key={mp.idMedioPago} className="contenedor-pasarela">
                        <input className="form-check-input mt-2" type="radio" onClick={() => handleRadioPayWay(mp.idMedioPago)} name="listGroupRadio" value={radioValue} id={`${mp.idMedioPago}`} />
                        &nbsp; 
                        <label className="form-check-label" htmlFor={`${mp.idMedioPago}`}> {mp.nombreMedioPago} </label>
                        &nbsp; &nbsp;
                        <img className="img-forma-pago" src={mp.urlImageBlob}/>
                    </div>

                ))
            }

        </div>
    )
}
