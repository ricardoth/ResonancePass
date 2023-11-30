import image from '../../../assets/images/stadium.png';
import { NavbarEvent } from '../../components/navbar/NavBarEvent';


export const LoginScreen = () => {
    return (
        <>
            <NavbarEvent />
            <div className="container">
               
                    <div className="grid-login d-flex flex-column flex-md-row">

                        <div className='left-login w-sm-50'>
                            <div className='container-image'>
                                <section id='wrap'>
                                    <div className='p1'>

                                    </div>
                                    <img src={image}/>

                                </section>

                            </div>
                        </div>
                        

                        <div className='right-login w-100 w-sm-50 d-none d-sm-block'>
                            <form>
                                <div className="col-lg-6">
                                    <label>Rut</label>
                                    <input 
                                        type="text"
                                        placeholder="Ingresa Rut"
                                        className="form-control"
                                    />
                                    
                                </div>

                                <div className="col-lg-6">
                                    <label>Contraseña</label>
                                    <input 
                                        type="password"
                                        placeholder="Contraseña"
                                        className="form-control"
                                    />
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                
            </div>
        </>
    )
}
