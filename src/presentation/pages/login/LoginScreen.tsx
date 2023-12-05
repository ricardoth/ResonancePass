import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import image from '../../../assets/images/logoimagen2.png';
import { NavbarEvent } from '../../components/navbar/NavBarEvent';
import * as Yup from 'yup';
import './LoginScreen.css';

interface LoginFormValues {
    email: string;
    password: string;
}

const validationSchema = Yup.object({
    email: Yup.string()
      .email('Debe ingresar un email válido')
      .required('El Email es requerido'),
    password: Yup.string().required('La Contraseña es requerida'),
});

export const LoginScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const formik = useFormik<LoginFormValues>({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema : validationSchema,
        onSubmit: (values) => {
            
            let payload = {
                email: values.email,
                ...location.state
            }

            navigate('/carro', {
                state: {payload}
            })
        },
    });

    return (
        <>
            <NavbarEvent />
            <div id="login-container">
                <div id="left-login">
                    <div id='container-image'>
                        <img src={image} id='img-login'/>
                    </div>
                </div>
                <div id="right-login">
                    <form id='container-right' className='container' onSubmit={formik.handleSubmit}>
                        <h5>Iniciar Sesión</h5>
                        <div className="col-lg-6">
                            <label>Email</label>
                            <input 
                                type="text"
                                name='email'
                                placeholder="Ingresa tu Email"
                                className="form-control"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />

                            {formik.touched.email && formik.errors.email ? (
                                <div style={{color:'red'}}>{formik.errors.email}</div>
                                ) : null}
                        </div>
                        <br/>
                        <div className="col-lg-6">
                            <label>Contraseña</label>
                            <input 
                                type="password"
                                name='password'
                                placeholder="Contraseña"
                                className="form-control"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            
                            {formik.touched.password && formik.errors.password ? (
                                <div style={{color:'red'}}>{formik.errors.password}</div>
                                ) : null}
                        </div>
                        <br/>
                        <div className='col-lg-6'>
                            <div className="d-grid gap-2">
                                <button className="btn btn-warning" type="submit">Ingresar</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
        </>
    )
}
