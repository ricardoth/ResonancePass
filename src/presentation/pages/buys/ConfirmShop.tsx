import { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom"
import { NavbarEvent } from "../../components/navbar/NavBarEvent";
import { formatCurrency } from "../../../types/currency";
import { formatDateHour } from '../../../utils/formatDateOption';
import { WayToPay } from './WayToPay';
// import { BuyerData } from './BuyerData';
import './ConfirmShop.css';
import { useFormik } from 'formik';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { environment } from '../../../environment/environment.dev';
import { Buffer } from 'buffer';
import { basicAuth } from '../../../types/basicAuth';
import { toast } from 'react-toastify';

const CURRENCY_CLP = 'CLP';
const URL_GENERAR_TICKETS = environment.UrlGenerarTicket;
const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;

export const ConfirmShop = () => {
    const { loginState } = useContext(AuthContext);
    const location = useLocation();
    const [ radioValue, setRadioValue ] = useState(0);

    const tickets = location.state?.ticketDetails;
    const total: number = location.state?.sumTotal;
    const eventDetails = location.state?.evento;

    useEffect(() => {
        formik.resetForm();
    }, []);
    

    useEffect(() => {
        console.log('tickets sectores', tickets)
    }, [radioValue]);

    const formik = useFormik({
        initialValues: {
            idUsuario: 0,
            idEvento: 0,
            idSector: 0,
            idMedioPago: 0,
            montoPago: 0,
            montoTotal: 0,
            fechaTicket: '',
            activo: true
            
        },
        // validationSchema : validationSchema,
        onSubmit: async (values) => {
            let ticketList: any[] = [];
            let fecha = new Date();

            //Falta setear cantidad
            tickets.map((t: any) => {
                for (let index = 0; index < t.cantidad; index++) {
                    let obj: any = {};
                    obj.idUsuario = loginState.user.idUsuario;
                    obj.idEvento = eventDetails.idEvento;
                    obj.idSector = t.idSector;
                    obj.idMedioPago = radioValue;
                    obj.montoPago = t.precio;
                    obj.montoTotal = t.total;
                    obj.fechaTicket = fecha;
                    obj.activo = true;
                    ticketList.push(obj);
                }
            });

            try {
                let response = await axios.post(URL_GENERAR_TICKETS, ticketList, {
                    headers: {
                        Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                    }
                });
                console.log(response.data)
                toast.success('Se han generado los tickets correctamente');
            } catch (error: any) {
                toast.error(error.response.data.Message);
            }
           
        },
    });

    return (
        <>
            <NavbarEvent />
            <section className="section-top-panel">
                <article className="info-evento-container">
                    <div className="row info-evento-box">
                        <h4><strong>Tu Compra</strong></h4>
                        <div className="col-lg-3">
                            <h6><strong>Evento</strong></h6>
                            <div className="list-group list-group-flush list-event">
                                <li className="list-group-item">{eventDetails.nombreEvento}</li>
                                <li className="list-group-item"><i className="bi bi-calendar3"></i> {formatDateHour(eventDetails.fecha)} Hrs.</li>
                            </div>
                            <img src={eventDetails.contenidoFlyer} width={100}/> 
                        </div>
                    
                        <div className="col-lg-3">
                            <h6><strong>Sector</strong></h6>
                            <div className="list-group list-group-flush list-event">
                                {
                                    tickets.map((row: any) => (
                                        <li key={row.idSector} className="list-group-item">{row.nombreSector}</li>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="col-lg-2">
                            <h6><strong>Precio</strong></h6>
                            <div className="list-group list-group-flush list-event">
                                {
                                    tickets.map((row: any) => (
                                        <li key={row.idSector} className="list-group-item">{formatCurrency(row.total, CURRENCY_CLP)}</li>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="col-lg-2">
                            <h6><strong>Cantidad</strong></h6>
                            <div className="list-group list-group-flush list-event">
                                {
                                    tickets.map((row: any) => (
                                        <li key={row.idSector} className="list-group-item">{row.cantidad}</li>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <h6><strong>Total</strong></h6>
                            <p>{formatCurrency(total, CURRENCY_CLP)}</p>
                        </div>
                    </div>
                </article>
            </section>

            {/* <section className="section-buyer">
                <article className="info-evento-container">
                    <div id='panel-form-buyer'>
                        <BuyerData />
                    </div>
                </article>
            </section> */}
            <form onSubmit={formik.handleSubmit}>

                <section className="section-confirm-panel">
                    <article className="info-evento-container">
                        <div id="panel-shop-account">
                            <WayToPay radioValue={radioValue} setRadioValue={setRadioValue} />
                        </div>
                        <hr/>

                        <div className="container">
                            <div className="row g-2">
                                <div className="col-auto">
                                    <h6><strong>Total</strong></h6>
                                </div>
                                <div className="col-auto">
                                    <p><strong>{formatCurrency(total, CURRENCY_CLP)}</strong></p>
                                </div>
                                <button className="btn btn-warning">Generar Compra</button>
                            </div>
                        </div>    
                    </article>
                </section>

            </form>
        </>
    )
}
