import { useState } from 'react';
import { useFormik } from 'formik';
import { UsuarioFormsProps } from '../../../domain/interfaces/interfaceProps/IUsuarioFormsProps';
import { NavbarEvent } from '../../components/navbar/NavBarEvent';
import { environment } from '../../../environment/environment.dev';
import { basicAuth } from '../../../types/basicAuth';
import { validarRutChileno } from '../../../utils/validarRutChileno';
import { Buffer } from 'buffer';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import './RegisterPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoaderFullScreen } from '../../components/loader/LoaderFullScreen';
import { Switch } from '../../components/switch/Switch';

const URL_USUARIOS = environment.UrlUsuarios;
const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;

const validationSchema = Yup.object({
    // rut: Yup
    //     .string()
    //     .test('Rut Válido', 'El Rut no es válido', value => validarRutChileno(value)),
    nombres: Yup
        .string()
        .required('El Nombre es obligatorio')
        .max(250, 'El Nombre debe tener como máximo 250 caractéres'),
    apellidoP: Yup
        .string()
        .required('El Apellido Paterno es obligatorio')
        .max(100, 'El Apellido Paterno debe tener como máximo 100 caractéres'),
    apellidoM: Yup
        .string()
        .required('El Apellido Materno es obligatorio')
        .max(100, 'El Apellido Materno debe tener como máximo 100 caractéres'),
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
    contrasena: Yup
        .string()
        .required('La Contraseña es obligatorio')
        .min(6, 'La Contraseña debe tener un largo mayor a 6 caractéres')
        .max(500, 'La Contraseña debe tener como máximo 500 caractéres')
        .matches(/^(?=.*[a-z])/, 'La contraseña debe contener al menos una minúscula')
        .matches(/^(?=.*[A-Z])/, 'La contraseña debe contener al menos una mayúscula')
        .matches(/^(?=.*[0-9])/, 'La contraseña debe contener al menos un número')
});

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [ showContrasena, setShowContrasena] = useState(false);
    const [ typeContrasena, setTypeContrasena ] = useState('password');
    const [ loading, setLoading ] = useState(false);
    const [ isExtranjero, setIsExtranjero ] = useState(false);
    const [ isVisibleRut, setIsVisibleRut ] = useState(true);

    const formik = useFormik<UsuarioFormsProps>({
        initialValues: {
            rut: '',
            nombres: '',
            apellidoP: '',
            apellidoM: '',
            direccion: '',
            telefono: '',
            correo: '',
            contrasena: '',
        },
        validationSchema : validationSchema,
        onSubmit: async (values) => {
            let rutNumber, dv;

            if(!isExtranjero) {
                if(!validarRutChileno(values.rut)) 
                    toast.error("El Rut no es válido");
                
                let rutSplit = values.rut.split('-');
                rutNumber = rutSplit[0];
                dv = rutSplit[1];
            } else {
                rutNumber = null;
                dv = null;
            }

            let userDetails = {
                rut: rutNumber,
                dv: dv,
                idTipoUsuario: environment.TipoUsuarioCliente,
                nombres: values.nombres,
                apellidoP: values.apellidoP,
                apellidoM: values.apellidoM,
                direccion: values.direccion,
                telefono: values.telefono,
                correo: values.correo,
                contrasena: values.contrasena,
                activo: true,
                esExtranjero: isExtranjero
            }

            try {
                setLoading(true);
                let response = await axios.post(URL_USUARIOS, userDetails, {
                    headers: {
                        Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                    }
                });

                console.log(response)

                if(response.status === 200) {
                   
                    toast.success("Se ha agregado exitosamente el usuario");
                    setTimeout(() => {
                        navigate("/login", {
                            replace: true
                        });
                    }, 1000);
                    setLoading(false);
                } 
                formik.resetForm();
            } catch (error: any) {
                toast.error(error.response.data.Message)
                setLoading(false);
                formik.resetForm();
            }
        },
    });

    const handleShowContrasena = (boolContrasena: boolean) => {
        setShowContrasena(boolContrasena);
        boolContrasena ? setTypeContrasena('text') : setTypeContrasena('password');
    }

    const handleChangeExtranjero = () => {
        setIsExtranjero(!isExtranjero);
        setIsVisibleRut(!isVisibleRut);
    }

    return (
        <>
            <NavbarEvent />
            {
                loading ? <LoaderFullScreen /> : 
                <div className='container-form-buyer'>
                    <form onSubmit={formik.handleSubmit}>
                        <h5><strong>¡Crea tu Cuenta Resonance Pass!</strong></h5>
                        <label>¿Es Extranjero?</label>
                        <Switch 
                            id={"usuarioExtranjero"}
                            isOn={isExtranjero}
                            onToogle={handleChangeExtranjero}
                        />

                        <div className="row mt-3">
                            {
                                isVisibleRut && (
                                    <div className="col-lg-6">
                                        <label>RUT</label>
                                        <input 
                                            type="text"
                                            name='rut'
                                            placeholder="Formato: XXXXXXXX-X"
                                            className="form-control"
                                            value={formik.values.rut}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            maxLength={10}
                                            autoComplete='off'
                                        />
        
                                        {formik.touched.rut && formik.errors.rut ? (
                                            <div style={{color:'red'}}>{formik.errors.rut}</div>
                                            ) : null}
                                    </div>
                                )
                            }

                            <div className="col-lg-6">
                                <label>Nombres</label>
                                <input 
                                    type="text"
                                    name='nombres'
                                    placeholder="Nombres"
                                    className="form-control"
                                    value={formik.values.nombres}
                                    onChange={formik.handleChange}
                                    autoComplete='off'
                                />

                                {formik.touched.nombres && formik.errors.nombres ? (
                                    <div style={{color:'red'}}>{formik.errors.nombres}</div>
                                    ) : null}
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-lg-6">
                                <label>Apellido Paterno</label>
                                <input 
                                    type="text"
                                    name='apellidoP'
                                    placeholder="Apellido Paterno"
                                    className="form-control"
                                    value={formik.values.apellidoP}
                                    onChange={formik.handleChange}
                                    autoComplete='off'
                                />

                                {formik.touched.apellidoP && formik.errors.apellidoP ? (
                                    <div style={{color:'red'}}>{formik.errors.apellidoP}</div>
                                    ) : null}
                            </div>

                            <div className="col-lg-6">
                                <label>Apellido Materno</label>
                                <input 
                                    type="text"
                                    name='apellidoM'
                                    placeholder="Apellido Materno"
                                    className="form-control"
                                    value={formik.values.apellidoM}
                                    onChange={formik.handleChange}
                                    autoComplete='off'
                                />

                                {formik.touched.apellidoM && formik.errors.apellidoM ? (
                                    <div style={{color:'red'}}>{formik.errors.apellidoM}</div>
                                    ) : null}
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-lg-6">
                                <label>Dirección</label>
                                <input 
                                    type="text"
                                    name='direccion'
                                    placeholder="Dirección"
                                    className="form-control"
                                    value={formik.values.direccion}
                                    onChange={formik.handleChange}
                                    autoComplete='off'
                                />

                                {formik.touched.direccion && formik.errors.direccion ? (
                                    <div style={{color:'red'}}>{formik.errors.direccion}</div>
                                    ) : null}
                            </div>
                            <div className="col-lg-6">
                                <label>Teléfono</label>
                                <input 
                                    type="text"
                                    name='telefono'
                                    placeholder="Teléfono o Celular"
                                    className="form-control"
                                    value={formik.values.telefono}
                                    onChange={formik.handleChange}
                                    autoComplete='off'
                                />

                                {formik.touched.telefono && formik.errors.telefono ? (
                                    <div style={{color:'red'}}>{formik.errors.telefono}</div>
                                    ) : null}
                            </div>
                            
                        </div>
                        <div className='row mt-2'>
                            <div className="col-lg-6">
                                <label>Correo</label>
                                <input 
                                    type="text"
                                    name='correo'
                                    placeholder="Correo"
                                    className="form-control"
                                    value={formik.values.correo}
                                    onChange={formik.handleChange}
                                    autoComplete='off'
                                />

                                {formik.touched.correo && formik.errors.correo ? (
                                    <div style={{color:'red'}}>{formik.errors.correo}</div>
                                    ) : null}
                            </div>

                            <div className="col-lg-6">
                                <label>Contraseña</label>
                                <div className='input-group'>
                                    <input 
                                        type={typeContrasena}
                                        name='contrasena'
                                        placeholder="Contraseña"
                                        className="form-control"
                                        value={formik.values.contrasena}
                                        onChange={formik.handleChange}
                                        autoComplete='off'
                                    />
                                    {
                                        showContrasena ? <span className='input-group-text' onClick={() => handleShowContrasena(false)}><i className='bi bi-eye-fill'></i></span> :
                                        <span className='input-group-text' onClick={() => handleShowContrasena(true)}><i className='bi bi-eye-slash-fill'></i></span>
                                    }
                                    
                                </div>
                                    {formik.touched.contrasena && formik.errors.contrasena ? (
                                        <div style={{color:'red'}}>{formik.errors.contrasena}</div>
                                        ) : null}
                            </div>

                        </div>
                        <br/>
                        <div className="row g-2">
                            <button type="submit" className="btn btn-outline-warning">
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}