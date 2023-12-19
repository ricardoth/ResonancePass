import { useEffect, useRef, useContext } from 'react';
import { Link, useNavigate,  } from 'react-router-dom';
import resonanceImg from '../../../assets/images/resonancePassBGWhite.png';
import { AuthContext } from '../../context/authContext';
import { types } from '../../../types/types';
import './Navbar.css';

export const NavbarEvent = () => {
    const { loginState, dispatchLoginState } = useContext(AuthContext);
    const navigate = useNavigate();
    const topRef = useRef<HTMLElement>(null);

    const handleLogout = () => {
        const logoutInfo: any = {
            type: types.logout
        };
        dispatchLoginState(logoutInfo);
        localStorage.removeItem('loginState');
        navigate("/", {
            replace: true
        });
    }

    useEffect(() => {
        topRef.current?.scrollIntoView();
    }, []);

    return (
        <>
            <nav ref={topRef} className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={"/"}>
                        <img src={resonanceImg} width={100} alt="Logo" />
                    </Link> 

                    <div className='ms-auto'>
                        { !loginState.logged ? '' : 
                            <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            <small>Hola, {loginState.user.nombres} {loginState.user.apellidoP}</small>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-dark">
                                            <li><Link className='dropdown-item' to={"/misDatos"}>Mis Datos</Link></li>
                                            <li><Link className='dropdown-item' to={"/misTickets"}>Mis Tickets</Link></li>
                                            <li><a className="dropdown-item" onClick={handleLogout}>Cerrar Sesión</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                        }
                    </div>
                    &nbsp;&nbsp;
                    <Link to={"/"} className='btn btn-outline-light me-2'><i className='bi bi-arrow-bar-left'></i> Volver al Inicio</Link>
                </div>

                
            </nav>
        </>
    )
}
