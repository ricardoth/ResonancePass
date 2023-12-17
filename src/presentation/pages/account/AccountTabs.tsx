import { useState } from "react"
import { NavbarEvent } from "../../components/navbar/NavBarEvent";
import './AccountTabs.css';
import { MyData } from "./MyData";
import { ChangePassword } from './ChangePassword';

export const AccountTabs = () => {
    const [ activeTab, setActiveTab ] = useState('personalInfo');

    return (
        <>
            <NavbarEvent />

            <ul className="nav nav-tabs my-data-container">
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'personalInfo' ? 'active': ''}`}
                        onClick={() => setActiveTab('personalInfo')}
                    >
                        <strong>Información Personal</strong>
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'changePassword' ? 'active': ''}`}
                        onClick={() => setActiveTab('changePassword')}
                    >
                        <strong>Cambiar Contraseña</strong>
                    </button>
                </li>
            </ul>

            <div className="tab-content my-data-container">
                <div className={`tab-pane ${activeTab === 'personalInfo' ? 'active': ''}`} id="personalInfo">
                    <MyData />
                </div>

                <div className={`tab-pane ${activeTab === 'changePassword' ? 'active': ''}`} id="changePassword">
                    <ChangePassword />
                </div>
            </div>
        </>
        
    )
}
