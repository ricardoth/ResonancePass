import { NavbarEvent } from "../../components/navbar/NavBarEvent"

export const FailureShop = () => {
    return (
        <>
            <NavbarEvent />
            <div className="receipt-container">
            <div className="receipt-header">
                <h2>Pago No Exitoso</h2>
            </div>
            <div className="receipt-details">
                <p><strong>ID de Transacción:</strong> 123456789</p>
                <p><strong>Fecha:</strong> 2023-12-05</p>
                <p><strong>Nombre de Usuario:</strong> Juan Pérez</p>
                <p>Lamentablemente, tu pago no pudo ser procesado en este momento.</p>
                <p>Por favor, intenta nuevamente o contacta a soporte si el problema persiste.</p>
            </div>
            <div className="receipt-footer">
                <button className="window.history.back()">Volver a Intentar</button>
            </div>
        </div>
        </>
    )
}
