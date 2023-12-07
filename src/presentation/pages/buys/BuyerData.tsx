import { useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { environment } from "../../../environment/environment.dev";
import { basicAuth } from '../../../types/basicAuth';
import { Buffer } from 'buffer';
import './BuyerData.css';
import { toast } from "react-toastify";

const URL_USUARIOS = environment.UrlUsuarios;
const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;

interface FormBuyerData {
    rut: string,
    nombres: string,
    apellidoP: string,
    apellidoM: string,
    direccion: string,
    telefono: string,
    correo: string
}

export const BuyerData = () => {

    useEffect(() => {
        const bs = (window as any).bootstrap; 
        if (bs) {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(tooltipTriggerEl => new bs.Tooltip(tooltipTriggerEl));
        }
    }, []);

    const formik = useFormik<FormBuyerData>({
        initialValues: {
            rut: '',
            nombres: '',
            apellidoP: '',
            apellidoM: '',
            direccion: '',
            telefono: '',
            correo: ''
        },
        // validationSchema : validationSchema,
        onSubmit: async (values) => {
       
            let rutSplit = values.rut.split('-');
            let rutNumber = rutSplit[0];
            let dv = rutSplit[1];
            let idTipoUsuario = 2; //Cliente

            let userDetails = {
                rut: rutNumber,
                dv: dv,
                idTipoUsuario: idTipoUsuario,
                nombres: values.nombres,
                apellidoP: values.apellidoP,
                apellidoM: values.apellidoM,
                direccion: values.direccion,
                telefono: values.telefono,
                correo: values.correo,
                activo: true
            }

            try {
                let response = await axios.post(URL_USUARIOS, userDetails, {
                    headers: {
                        Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                    }
                });

                console.log(response)
                toast.success("Se ha agregado exitosamente el usuario");
            } catch (error: any) {
                console.log(error.response.data)
                toast.error(error.response.data.Message)
            }
        },
    });

    return (
        <div className='container-form-buyer mt-5'>
            <form onSubmit={formik.handleSubmit}>
                <h5><strong>Datos Usuario</strong></h5>
                <div className="input-group">
                    <div className="col-lg-6">
                        <label>RUT</label>
                        <input 
                            type="text"
                            name='rut'
                            placeholder="Rut"
                            className="form-control"
                            value={formik.values.rut}
                            onChange={formik.handleChange}
                            maxLength={10}
                        />

                        {formik.touched.rut && formik.errors.rut ? (
                            <div style={{color:'red'}}>{formik.errors.rut}</div>
                            ) : null}
                    </div>

                    <div className="col-lg-6">
                        <label>Nombres</label>
                        <input 
                            type="text"
                            name='nombres'
                            placeholder="Nombres"
                            className="form-control"
                            value={formik.values.nombres}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.nombres && formik.errors.nombres ? (
                            <div style={{color:'red'}}>{formik.errors.nombres}</div>
                            ) : null}
                    </div>
                </div>

                <div className="input-group">
                    <div className="col-lg-4">
                        <label>Apellido Paterno</label>
                        <input 
                            type="text"
                            name='apellidoP'
                            placeholder="Apellido Paterno"
                            className="form-control"
                            value={formik.values.apellidoP}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.apellidoP && formik.errors.apellidoP ? (
                            <div style={{color:'red'}}>{formik.errors.apellidoP}</div>
                            ) : null}
                    </div>

                    <div className="col-lg-4">
                        <label>Apellido Materno</label>
                        <input 
                            type="text"
                            name='apellidoM'
                            placeholder="Apellido Materno"
                            className="form-control"
                            value={formik.values.apellidoM}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.apellidoM && formik.errors.apellidoM ? (
                            <div style={{color:'red'}}>{formik.errors.apellidoM}</div>
                            ) : null}
                    </div>

                    <div className="col-lg-4">
                        <label>Dirección</label>
                        <input 
                            type="text"
                            name='direccion'
                            placeholder="Dirección"
                            className="form-control"
                            value={formik.values.direccion}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.direccion && formik.errors.direccion ? (
                            <div style={{color:'red'}}>{formik.errors.direccion}</div>
                            ) : null}
                    </div>
                </div>
                <div className="input-group">
                    <div className="col-lg-6">
                        <label>Teléfono</label>
                        <input 
                            type="text"
                            name='telefono'
                            placeholder="Teléfono o Celular"
                            className="form-control"
                            value={formik.values.telefono}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.telefono && formik.errors.telefono ? (
                            <div style={{color:'red'}}>{formik.errors.telefono}</div>
                            ) : null}
                    </div>
                    <div className="col-lg-6">
                        <label>Correo</label>
                        <input 
                            type="text"
                            name='correo'
                            placeholder="Correo"
                            className="form-control"
                            value={formik.values.correo}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.correo && formik.errors.correo ? (
                            <div style={{color:'red'}}>{formik.errors.correo}</div>
                            ) : null}
                    </div>
                </div>
                {/* <div className="row g-2">
                    <button type="submit" className="btn btn-warning" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Guardar Usuario para futuras compras">
                        Guardar Usuario
                    </button>
                </div> */}
            </form>
        </div>
    )
}