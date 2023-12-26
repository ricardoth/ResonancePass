import { useLocation } from "react-router-dom";
import { NavbarEvent } from "../../components/navbar/NavBarEvent"
import { useAuth } from "../../context/authContext";
import './FailureShop.css';
import { getDateNow } from "../../../utils/formatDateOption";

export const FailureShop = () => {
    const {loginState} = useAuth();
    const location = useLocation();
    const searchParam: any = location.search;
    const spliter: string = searchParam.split('&');
    const transactionParam: string = spliter[0]; 
    const transactionState: string = transactionParam.replace('?transactionId=', '');

    return (
        <>
            <NavbarEvent />
            <div className="container mt-2">
                <div className="receipt-container">
                    <div className="receipt-header">
                        <h2>Pago No Exitoso</h2>
                    </div>
                    <div className="receipt-details">
                        <p><strong>ID de Transacción:</strong> {transactionState}</p>
                        <p><strong>Fecha:</strong> {getDateNow()}</p>
                        <p><strong>Nombre de Usuario:</strong> {loginState.user.nombres} {loginState.user.apellidoP} {loginState.user.apellidoM}</p>
                        <p>Lamentablemente, tu pago no pudo ser procesado en este momento.</p>
                        <p>Por favor, intenta nuevamente o contacta al Administrador si el problema persiste.</p>
                    </div>
                    <div className="receipt-footer">
                        <div className="d-grid gap-2">
                            <button type="button" className="btn btn-danger" onClick={() => window.history.back()}>Volver a Intentar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
