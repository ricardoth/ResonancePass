import axios from "axios";
import { replace, useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { environment } from "../../../environment/environment.dev";
import { basicAuth } from "../../../types/basicAuth";
import { AuthContext } from "../../context/authContext";
import { Buffer } from 'buffer';
import * as Yup from 'yup';
import { LoaderFullScreen } from "../../components/loader/LoaderFullScreen";
import { toast } from "react-toastify";
import { Loader } from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const URL_USUARIOS = environment.UrlUsuarios + "/ChangePassword";
const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;

const validationSchema = Yup.object({
    contrasena: Yup
        .string()
        .required('La Contraseña es obligatorio')
        .min(6, 'La Contraseña debe tener un largo mayor a 6 caractéres')
        .max(500, 'La Contraseña debe tener como máximo 500 caractéres')
        .matches(/^(?=.*[a-z])/, 'La contraseña debe contener al menos una minúscula')
        .matches(/^(?=.*[A-Z])/, 'La contraseña debe contener al menos una mayúscula')
        .matches(/^(?=.*[0-9])/, 'La contraseña debe contener al menos un número'),
    confirmarContrasena: Yup
        .string()
        .required('La Contraseña es obligatorio')
        .oneOf([Yup.ref('contrasena')], 'Las contraseñas deben ser iguales')

});

export const ChangePassword = () => {
    const navigate = useNavigate();
    const { loginState } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false);
    const [ showNewPass, setShowNewPass ] = useState(false);
    const [ typeNewPass, setTypeNewPass ] = useState('password');
    const [ showConfirmPass, setShowConfirmPass ] = useState(false);
    const [ typeConfirmPass, setTypeConfirmPass ] = useState('password');

    useEffect(() => {
        formik.resetForm();
    }, []);

    const formik = useFormik({
        initialValues: {
            idUsuario: loginState.user.idUsuario,
            contrasena: '',
            confirmarContrasena: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                let response = await axios.post(URL_USUARIOS, values, {
                    headers: {
                        Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                    }
                });

                if(response.data.data) {
                    toast.success("Se ha cambiado la contraseña exitosamente!");
                    navigate("/", {
                        replace: true
                    });
                } else {
                    toast.error("No se pudo cambiar la contraseña");
                }
                formik.resetForm();
                setLoading(false);
            } catch (error: any) {
                toast.error(error.response.data.Message)
                formik.resetForm();
                setLoading(false);
            }
        }
    });

    if ( loading ) return <Loader />;

    const handleShowNewPass = (boolContrasena: boolean) => {
        setShowNewPass(boolContrasena);
        boolContrasena ? setTypeNewPass('text') : setTypeNewPass('password');
    }

    const handleConfirmPass = (boolContrasena: boolean) => {
        setShowConfirmPass(boolContrasena);
        boolContrasena ? setTypeConfirmPass('text') : setTypeConfirmPass('password');
    }

    return (
        <>
            <section className="container-change-password animate__animated animate__fadeIn">
                <h4><strong>Mi Contraseña</strong></h4>
                <p>Modifica tu contraseña</p>
                <hr/>

                <section className="form-change-password">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="row">
                            <div className="col-lg-12">
                                <label>Contraseña Nueva</label>
                                <div className="input-group">
                                    <input 
                                        type={typeNewPass}
                                        name='contrasena'
                                        placeholder="Nueva Contraseña"
                                        className="form-control"
                                        value={formik.values.contrasena}
                                        onChange={formik.handleChange}
                                        autoComplete='off'
                                        required
                                    />
                                    {
                                        showNewPass ? <span className='input-group-text' onClick={() => handleShowNewPass(false)}><i className='bi bi-eye-fill'></i></span> :
                                        <span className='input-group-text' onClick={() => handleShowNewPass(true)}><i className='bi bi-eye-slash-fill'></i></span>
                                    }
                                </div>
                                {formik.touched.contrasena && formik.errors.contrasena ? (
                                    <div style={{color:'red'}}>{formik.errors.contrasena}</div>
                                    ) : null}
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-lg-12">
                            <label>Confirmar Contraseña</label>
                                <div className="input-group">
                                    <input 
                                        type={typeConfirmPass}
                                        name='confirmarContrasena'
                                        placeholder="Repita su Contraseña"
                                        className="form-control"
                                        value={formik.values.confirmarContrasena}
                                        onChange={formik.handleChange}
                                        autoComplete='off'
                                        required
                                    />
                                    {
                                        showConfirmPass ? <span className='input-group-text' onClick={() => handleConfirmPass(false)}><i className='bi bi-eye-fill'></i></span> :
                                        <span className='input-group-text' onClick={() => handleConfirmPass(true)}><i className='bi bi-eye-slash-fill'></i></span>
                                    }
                                </div>
                                {formik.touched.confirmarContrasena && formik.errors.confirmarContrasena ? (
                                    <div style={{color:'red'}}>{formik.errors.confirmarContrasena}</div>
                                    ) : null}
                            </div>
                        </div>
                        <br/>
                        <div className="row g-2">
                            <button type="submit" className="btn btn-outline-warning">
                                Cambiar Contraseña  <i className="bi bi-shield-lock-fill"></i>
                            </button>
                        </div>
                    </form>
                </section>
            </section>
        </>
    )
}
