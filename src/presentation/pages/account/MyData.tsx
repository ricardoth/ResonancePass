import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Buffer } from 'buffer';
import { AuthContext } from "../../context/authContext";
import * as Yup from 'yup';
import './MyData.css';
import { environment } from "../../../environment/environment.dev";
import { basicAuth } from "../../../types/basicAuth";
import { toast } from "react-toastify";
import axios from "axios";
import { Loader } from "../../components/loader/Loader";

const URL_USUARIO = environment.UrlUsuarios;
const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;

const validationSchema = Yup.object({
    direccion: Yup
        .string()
        .required('La Dirección es obligatoria')
        .max(250, 'La Dirección debe tener como máximo 250 caractéres'),
    telefono: Yup
        .string()
        .required('El Teléfono es obligatorio')
        .max(20, 'El Teléfono debe tener como máximo 20 caractéres'),
    correo: Yup
        .string()
        .email('Debe ingresar un email válido')
        .required('El Email es obligatorio')
        .max(200, 'El Email debe tener como máximo 200 caractéres'),
});

export const MyData = () => {
    const { loginState } = useContext(AuthContext); 
    const [ loading, setLoading ] = useState(false);
    const [ userData, setUserData ] = useState({
        idUsuario: 0,
        idTipoUsuario: 0,
        rut: '',
        dV: '',
        nombres: '',
        apellidoP: '',
        apellidoM: '',
        telefono: '',
        direccion: '',
        correo: '',
        activo: true,
        esExtranjero: false
    })

    useEffect(() => {
        fetchUsuario();
    }, []);

    useEffect(() => {
        formik.setValues(userData);
    }, [userData]);
    
    const fetchUsuario = async () => {
        try {
            setLoading(true);
            let response = await axios.get(URL_USUARIO + '/' + loginState.user.idUsuario, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                }
            });

            if (response.status === 200) {
                setUserData(response.data.data)
            }
            setLoading(false);
        } catch (error: any) {
            toast.error(error.response.data.Message)
            setLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            idUsuario: userData.idUsuario,
            idTipoUsuario: userData.idTipoUsuario,
            rut: userData.rut,
            dV: userData.dV,
            nombres: userData.nombres,
            apellidoP: userData.apellidoP,
            apellidoM: userData.apellidoM,
            telefono: userData.telefono,
            direccion: userData.direccion,
            correo: userData.correo,
            activo: userData.activo,
            esExtranjero: userData.esExtranjero
        }, 
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                let response = await axios.put(URL_USUARIO + '?id=' + values.idUsuario, values, {
                    headers: {
                        Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                    }
                });

                if (response.status === 200) {
                    toast.success('Se han guardado los cambios correctamente');
                }
                setLoading(false);
            } catch (error: any) {
                toast.error(error.response.data.Message)
                setLoading(false);
            }
        }
    });

    if ( loading ) return <Loader />;

    return (
        <>
            <section className="container-my-data animate__animated animate__fadeIn">
                <h4><strong>Mi Cuenta</strong></h4>
                <p>Modifica tus datos de contacto</p>
                <hr/>
                <section className="container-form-my-data">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Nombre</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    value={`${loginState.user.nombres}`}
                                    disabled
                                />
                            </div>

                            <div className="col-lg-6">
                                <label>Apellidos</label> 
                                <input 
                                    type="text"
                                    className="form-control"
                                    value={`${loginState.user.apellidoP} ${loginState.user.apellidoM}`}
                                    disabled
                                />
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            {
                                !userData.esExtranjero && (
                                    <div className="col-lg-6">
                                        <label>Rut</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            value={`${loginState.user.rut}-${loginState.user.dv}`}
                                            disabled
                                        />
                                    </div>
                                )
                            }
                            <div className="col-lg-6">
                                <label>Teléfono</label>
                                <input 
                                    type="text" 
                                    name="telefono"
                                    placeholder="Teléfono"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    value={formik.values.telefono}
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Dirección</label>
                                <input 
                                    type="text" 
                                    name="direccion"
                                    placeholder="Dirección"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    value={formik.values.direccion}
                                    autoComplete='off'
                                />
                            </div>
                            <div className="col-lg-6">
                                <label>Correo</label> 
                                <input 
                                    type="text" 
                                    name="correo"
                                    placeholder="Correo"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    value={formik.values.correo}
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                        <br/>
                        <div className="row g-2">
                            <button type="submit" className="btn btn-outline-warning">
                                Guardar Cambios <i className="bi bi-floppy-fill"></i>
                            </button>
                        </div>
                    </form>
                </section>
            </section>
        </>
    )
}
