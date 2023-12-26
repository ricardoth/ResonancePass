import { useLocation, useNavigate } from "react-router-dom";
import { getDateNow } from "../../../utils/formatDateOption";
import { NavbarEvent } from "../../components/navbar/NavBarEvent"
import { useAuth } from "../../context/authContext";
import './FailureShop';

export const PendingShop = () => {
    const {loginState} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const searchParam: any = location.search;
    const spliter: string = searchParam.split('&');
    const transactionParam: string = spliter[0];
    const transactionState: string = transactionParam.replace('?transactionId=', '');

    const handleNavigation = () => {
        navigate("/", {
            replace: true
        });
    }

    return (
        <>
            <NavbarEvent />
            <div className="container mt-2">
                <div className="receipt-container">
                    <div className="receipt-header">
                        <h2>Pago Pendiente</h2>
                    </div>
                    <div className="receipt-details">
                        <p><strong>ID de Transacción:</strong> {transactionState}</p>
                        <p><strong>Fecha:</strong> {getDateNow()}</p>
                        <p><strong>Nombre de Usuario:</strong> {loginState.user.nombres} {loginState.user.apellidoP} {loginState.user.apellidoM}</p>
                        <p>Tu Pago está pendiente</p>
                        <p>Por favor, espera y confirma el pago desde tu app o contacta al administrador.</p>
                    </div>
                    <div className="receipt-footer">
                        <div className="d-grid gap-2">
                            <button type="button" className="btn btn-info" onClick={handleNavigation}>Volver</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}