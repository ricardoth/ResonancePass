import resonanceImg from '../../../assets/images/resonancePassBGWhite.png';
import './Footer.css';

export const Footer = () => {
    return (
        <footer className="footer-landing-container">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9 mt-5 mb-5">
                        <div className="row ">
                            <div className="col-lg-4">
                                <img src={resonanceImg}  width={100} alt="logo footer" className="float-left d-none d-sm-block" /> 
                                <img src={resonanceImg}  width={100} alt="logo footer" className="float-left d-block d-sm-none" />
                            </div>

                            <div className='col-lg-4'>
                                <h6 className="text-white">NOSOTROS</h6>
                                <br />
                                <a href='#' className="text-white">Quienes Somos</a>
                                <br />
                                <a href='#' className="text-white">Contacto</a>
                                <br />
                                <a href='#' className="text-white">Términos y Condiciones</a>
                            </div>

                            <div className='col-lg-4'>
                                <h6 className="text-white">CO-WORK</h6>
                                <br />
                                <a href='#' className="text-white">Crea tu Evento</a>
                                <br />
                                <a href='#' className="text-white">Trabaja con Nosotros</a>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 mt-5 mb-5'>
                        <div className='row'>
                            <div className='text-white'>
                                <h6 className="text-white">REDES SOCIALES</h6>
                                <div className='redes-sociales'>
                                    <a href="https://www.facebook.com" target="_blank" rel="noopener" className="facebook"><i className="bi bi-facebook"></i></a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener" className="twitter"><i className="bi bi-twitter-x"></i></a>
                                    <a href="https://www.instagram.com" target="_blank" rel="noopener" className="instagram"><i className="bi bi-instagram"></i></a>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
