import { useLocation } from "react-router-dom"
import { NavbarEvent } from "../../components/navbar/NavBarEvent";
import './ConfirmShop.css';
import { useEffect, useState } from 'react';
import { Sector } from "../../../domain/entities/Sector";

export const ConfirmShop = () => {
    const location = useLocation();
    const [ tickets, setTickets ] = useState(location.state?.seleccionSectores);

    useEffect(() => {
        console.log(tickets)
    }, []);
    

    return (
        <>
            <NavbarEvent />
            <section className="section-top-panel">
                <div className="card mt-2">
                    <div className="card-title ">
                        <h4 className="">Datos Compra</h4>
                    </div>
                    <div className="card-body">
                        <ul>
                            {
                                tickets.map((sec: Sector) => (
                                    <li key={sec.idSector}>{sec.idSector}</li>
                                ))
                            }
                        </ul>

                    </div>
                </div>
            </section>

            <section className="section-confirm-panel">
                <div className="left-panel-confirm">
                    <h1>DATOS COMPRADOR</h1>

                </div>

                <div className="right-panel-confirm">
                    <h1>FORMAS DE PAGO</h1>
                </div>
            </section>
        </>
    )
}
