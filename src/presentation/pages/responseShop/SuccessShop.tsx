import { useLocation, useNavigate } from "react-router-dom"
import { NavbarEvent } from "../../components/navbar/NavBarEvent"
import { useEffect, useState } from "react";
import { environment } from "../../../environment/environment.dev";
import { Buffer } from 'buffer';
import axios from "axios";
import { basicAuth } from "../../../types/basicAuth";
import { toast } from "react-toastify";
import { LoaderFullScreen } from "../../components/loader/LoaderFullScreen";
import { openPdfWindow } from "../../../utils/pdfBlobOption";
import './SuccessShop.css';
import { formatDateHour } from "../../../utils/formatDateOption";
import { useAuth } from "../../context/authContext";
import { formatCurrency } from "../../../types/currency";

const URL_GET_TICKETS = environment.UrlTickets + "/GetPreferenceTickets/";
const URL_GENERAR_TICKETS = environment.UrlGenerarTicket;
const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;

export const SuccessShop = () => {
    const {loginState} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const searchParam: any = location.search;
    const spliter: string = searchParam.split('&');
    const transactionParam: string = spliter[0]; //siempre viene en la posición 0
    const paymentParam: string = spliter[3];
    const transactionState: string = transactionParam.replace('?transactionId=', '');
    const paymentState: string = paymentParam.replace('payment_id=', '');

    const [ tickets, setTickets] = useState([] as any);
    const [ loading, setLoading ] = useState(false);

    const handleGenerateTickets = async () => {
        try {
            setLoading(true);
            let ticketList = tickets.map((t: any) => {
                let obj: any = {
                    idUsuario: t.idUsuario,
                    idEvento: t.idEvento,
                    idSector: t.idSector,
                    idMedioPago: t.idMedioPago,
                    montoPago: t.montoPago,
                    montoTotal: t.montoTotal,
                    fechaTicket: t.fechaTicket,
                    activo: t.activo
                }
                return obj;
            });

            let response = await axios.post(URL_GENERAR_TICKETS, ticketList, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                }
            });

            if (response.status === 200) {
                toast.success('Se han generado los tickets correctamente');
                openPdfWindow(response.data);
                
             
            } else {
                toast.error(response.data);
            }
            setLoading(false);
        } catch (error: any) {
            console.log(error)
            setLoading(false);
        }
    }

    const handleGetTickets = async (transactionId: string) => {
        try {
            setLoading(true);
            let response = await axios.get(URL_GET_TICKETS + transactionId, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                }
            });

            if (response.status === 200) {
                const {data} = response.data;
                setTickets(data);
                console.log(data)
            } else {
                toast.error("No se pudo generar la transacción y el pago, ha ocurrido un error, por favor contacte al Administrador");
            }

            setLoading(false);
        } catch (error: any) {
            console.log(error)
            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetTickets(transactionState);
    }, []);

    useEffect(() => {
        if(tickets.length > 0) 
            handleGenerateTickets();
    }, [tickets.length > 0])

    if (loading || tickets.length === 0) return <><NavbarEvent/><LoaderFullScreen/></>

    const handleNavigation = () => {
         navigate('/misTickets', {
                replace: true
            })
    }

    return (
        <>
            <NavbarEvent />
            <div className="container mt-2">
                <div className="receipt-container">
                    <div className="receipt-header">
                        <h2>Comprobante de Pago</h2>
                    </div>
                    <div className="receipt-body">
                        <p><strong>ID de Transacción:</strong> {paymentState}</p>
                        <p><strong>Fecha:</strong> {formatDateHour(tickets[0].fechaTicket)}</p>
                        <p><strong>Nombre de Usuario:</strong> {loginState.user.nombres} {loginState.user.apellidoP} {loginState.user.apellidoM}</p>
                        <p><strong>Detalles del Pago:</strong> {tickets[0].evento.nombreEvento}</p>
                        <ul>
                            { 
                                tickets.map((t: any) => {
                                   return <li key={t.idPreference}> {t.sector.nombreSector} - {formatCurrency(t.montoTotal, 'CLP')}</li>
                                })
                            }
                        </ul>
                        <p><strong>Total:</strong> { formatCurrency(tickets.reduce((acc: any, {montoTotal}: any) => acc + montoTotal, 0), 'CLP')}</p>
                    </div>
                    <div className="receipt-footer">
                        <button type="button" className="btn btn-warning" onClick={handleNavigation}>Ir a Mis Tickets</button>
                        <p>*En 5 segundos se redigirá automáticamente</p>
                    </div>
                </div>
            </div> 
        </>
        
    )
}
