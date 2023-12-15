import { useContext } from "react";
import { NavbarEvent } from "../../components/navbar/NavBarEvent"
import { AuthContext } from "../../context/authContext";

import './MyData.css';
import { useFormik } from "formik";

export const MyData = () => {
    const { loginState } = useContext(AuthContext); 
    console.log(loginState.user)

    const formik = useFormik({
        initialValues: {
            idUsuario: loginState.user.idUsuario,
            rut: loginState.user.rut,
            dv: loginState.user.dv,
            nombres: loginState.user.nombres,
            apellidoP: loginState.user.apellidoP,
            apellidoM: loginState.user.apellidoM,
            telefono: loginState.user.telefono,
            direccion: loginState.user.direccion,
            correo: loginState.user.correo
        }, 
        validationSchema: '',
        onSubmit: async (values) => {
            console.log(values)
        }
    });

    return (
        <>
            <NavbarEvent />

            <section className="container-my-data">
                <h3><strong>{loginState.user.nombres} {loginState.user.apellidoP} {loginState.user.apellidoM}</strong></h3>
                <h6>{loginState.user.rut}-{loginState.user.dv}</h6>
                <br />
                <section className="container-form-my-data">
                    <form onSubmit={formik.submitForm}>
                        <div className="row">
                            <div className="col-lg-6">
                                <label>Rut</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    value={`${loginState.user.rut}-${loginState.user.dv}`}
                                    disabled
                                />
                            </div>
                            <div className="col-lg-6">
                                <label>Nombre Completo</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    value={`${loginState.user.nombres} ${loginState.user.apellidoP} ${loginState.user.apellidoM}`}
                                    disabled
                                />
                            </div>
                        </div>
                        <br/>
                        <div className="row">
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
                        </div>
                        <br/>
                        <div className="row">
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
