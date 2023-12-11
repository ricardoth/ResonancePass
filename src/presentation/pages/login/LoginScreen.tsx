import { useLocation, useNavigate  } from 'react-router-dom';
import { useFormik } from 'formik';
import image from '../../../assets/images/logoimagen2.png';
import { NavbarEvent } from '../../components/navbar/NavBarEvent';
import * as Yup from 'yup';
import './LoginScreen.css';
import axios from 'axios';
import { environment } from '../../../environment/environment.dev';
import { basicAuth } from '../../../types/basicAuth';
import { Buffer } from 'buffer';
import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { Loader } from '../../components/loader/Loader';
import { types } from '../../../types/types';
import { AuthContext } from '../../context/authContext';
import { useRouteHistory } from '../../context/historyContext';

const URL_USUARIO_LOGIN = environment.UrlUsuarios + "/Login";
const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;

interface LoginFormValues {
    correo: string;
    contrasena: string;
}

const validationSchema = Yup.object({
    correo: Yup.string()
      .email('Debe ingresar un email válido')
      .required('El Email es requerido'),
      contrasena: Yup.string().required('La Contraseña es requerida'),
});

export const LoginScreen = () => {
    const { dispatchLoginState } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false);
    const location = useLocation();
    const eventDetails = location.state?.eventDetails;
    const navigate = useNavigate();
    const { previousPath } = useRouteHistory();

    const formik = useFormik<LoginFormValues>({
        initialValues: {
            correo: '',
            contrasena: ''
        },
        validationSchema : validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                let response = await axios.post(URL_USUARIO_LOGIN, values ,{
                    headers: {
                        Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                    }
                });
                let usuario = response.data.data;
                setLoading(false);
                //Envío a context API
                const basicInfoUser: any = {
                    type: types.login,
                    payload: usuario,
                }

                const loginInfo = {
                    logged: true,
                    user: usuario
                }
                dispatchLoginState(basicInfoUser);
                localStorage.setItem('loginState', JSON.stringify(loginInfo));

                if (previousPath == '/' || previousPath == '') {
                    navigate('/');
                } else {
                    navigate('/carro', {
                        state: [ eventDetails ]
                    });
                }
                formik.resetForm();
            } catch (error: any) {
                setLoading(false);
                toast.error(error.response.data.Message);
                formik.resetForm();
            }
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
                        <div className="col-lg-8">
                            <label>Email</label>
                            <input 
                                type="text"
                                name='correo'
                                placeholder="Ingresa tu Email"
                                className="form-control"
                                value={formik.values.correo}
                                onChange={formik.handleChange}
                                autoComplete='off'
                            />

                            {formik.touched.correo && formik.errors.correo ? (
                                <div style={{color:'red'}}>{formik.errors.correo}</div>
                                ) : null}
                        </div>
                        <div className="col-lg-8">
                            <label>Contraseña</label>
                            <input 
                                type="password"
                                name='contrasena'
                                placeholder="Contraseña"
                                className="form-control"
                                value={formik.values.contrasena}
                                onChange={formik.handleChange}
                                autoComplete='off'
                            />
                            
                            {formik.touched.contrasena && formik.errors.contrasena ? (
                                <div style={{color:'red'}}>{formik.errors.contrasena}</div>
                                ) : null}
                        </div>
                        <div className='register-login'>
                            {/* <Link to={'/resetPassword'}>¿Olvidaste tu Contraseña?</Link> */}
                            <a href='#'>¿No tienes cuenta? Registrate</a>
                        </div>
                        <br/>
                        {
                            loading ? <Loader /> :
                            <div className='col-lg-8'>
                                <div className="d-grid gap-2">
                                    <button className="btn btn-warning" type="submit">Ingresar</button>
                                </div>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}
