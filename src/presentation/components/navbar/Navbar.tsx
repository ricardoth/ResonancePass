// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import resonanceImg from '../../../assets/images/resonancePassBGWhite.png';
import { Searchbar } from '../searchBar/Searchbar';
import './Navbar.css';

export const Navbar = () => {

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

                    <div className="d-none d-lg-flex ms-auto">
                        <button className='btn btn-outline-light me-2'>Ingresa</button>
                        <button className='btn btn-outline-light'>Registrate</button>
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
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Ingresa</a>
                                </li>
                                <hr className='separator'/>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Registrate</a>
                                </li>
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
