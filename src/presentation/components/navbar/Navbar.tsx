import { Link, useNavigate } from 'react-router-dom';
import resonanceImg from '../../../assets/images/resonancePassBGWhite.png';
import { Searchbar } from '../searchBar/Searchbar';
import './Navbar.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { types } from '../../../types/types';

export const Navbar = () => {
    const { loginState, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        const logoutInfo: any = {
            type: types.logout,
            payload: null
        };
        dispatch(logoutInfo);
        navigate("/", {
            replace: true
        });
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={"/"}>
                        <img src={resonanceImg} width={100} alt="Logo" />
                    </Link> 

                    <div className="d-none d-lg-flex ms-auto">
                        <Searchbar />
                    </div>

                    <div className='d-none d-lg-flex ms-auto'>
                        { !loginState.logged ? 
                            <div className="d-none d-lg-flex ms-auto">
                                <Link className='btn btn-outline-light me-2' to={"/login"}>Ingresa</Link>
                                <button className='btn btn-outline-light'>Registrate</button>
                            </div> 
                            : 
                            <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            <small>Hola, {loginState.user.nombres} {loginState.user.apellidoP}</small>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-dark">
                                            <li><a className="dropdown-item" href="#">Mis Datos</a></li>
                                            <li><a className="dropdown-item" href="#">Mis Tickets</a></li>
                                            <Link className='dropdown-item' to={"/changePassword"}>Cambiar Contraseña</Link>

                                            <li><button className='nav-item dropdown-item' onClick={handleLogout}>Cerrar Sesión</button></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                        }
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="offcanvas offcanvas-end text-bg-dark bg-dark" tabIndex={-1} id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header">
                            <a className="navbar-brand" href="#">
                                <img src={resonanceImg} width={100} alt="Logo" />
                            </a>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                {
                                    !loginState.logged ? 
                                    <>
                                        <li className="nav-item">
                                            <Link className='nav-link active' to={"/login"}>Ingresa</Link>
                                        </li>
                                        <hr className='separator'/>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Registrate</a>
                                        </li>
                                    </>
                                    : 
                                    <>
                                        <li className="nav-item text-white">
                                            <small>Hola, {loginState.user.nombres} {loginState.user.apellidoP}</small>
                                        </li>
                                        <hr className='separator'/>
                                        <li><a className="nav-item text-white" href="#">Mis Datos</a></li>
                                        <li><a className="nav-item text-white" href="#">Mis Tickets</a></li>
                                        <li>
                                            <Link className='nav-item text-white' to={"/changePassword"}>Cambiar Contraseña</Link>
                                        </li>
                                        <li nav-item text-white>
                                            <a className='nav-item text-white' onClick={handleLogout}>Cerrar Sesión</a>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <div className={`d-lg-none w-100 mt-2 mb-2`}>
                <Searchbar />
            </div>
        </>
    )
}
