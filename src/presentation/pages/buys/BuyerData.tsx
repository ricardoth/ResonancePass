import { useFormik } from "formik";
import './BuyerData.css';

interface FormBuyerData {
    email: string,
    password: string
}

export const BuyerData = () => {


    const formik = useFormik<FormBuyerData>({
        initialValues: {
            email: '',
            password: ''
        },
        // validationSchema : validationSchema,
        onSubmit: (values) => {
            
           console.log(values)
        },
    });

    return (
        <div className='container-form-buyer mt-5'>
            <form onSubmit={formik.handleSubmit}>
                    <h5><strong>Datos Usuario</strong></h5>
                    <div className="col-lg-12">
                        <label>RUT</label> 
                        <input 
                            type="text"
                            name='email'
                            placeholder="Rut"
                            className="form-control"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.email && formik.errors.email ? (
                            <div style={{color:'red'}}>{formik.errors.email}</div>
                            ) : null}
                    </div>
                    
                    <div className="col-lg-12">
                        <label>Nombre</label>
                        <input 
                            type="text"
                            name='email'
                            placeholder="Nombres"
                            className="form-control"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.email && formik.errors.email ? (
                            <div style={{color:'red'}}>{formik.errors.email}</div>
                            ) : null}
                    </div>
                    
                    <div className="col-lg-12">
                        <label>Apellidos</label>
                        <input 
                            type="text"
                            name='email'
                            placeholder="Apellido Paterno y Materno"
                            className="form-control"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.email && formik.errors.email ? (
                            <div style={{color:'red'}}>{formik.errors.email}</div>
                            ) : null}
                    </div>

                    <div className="col-lg-12">
                        <label>Dirección</label>
                        <input 
                            type="text"
                            name='email'
                            placeholder="Dirección"
                            className="form-control"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.email && formik.errors.email ? (
                            <div style={{color:'red'}}>{formik.errors.email}</div>
                            ) : null}
                    </div>

                    <div className="col-lg-12">
                        <label>Teléfono</label>
                        <input 
                            type="text"
                            name='email'
                            placeholder="Teléfono o Celular"
                            className="form-control"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.email && formik.errors.email ? (
                            <div style={{color:'red'}}>{formik.errors.email}</div>
                            ) : null}
                    </div>

                    <div className="col-lg-12">
                        <label>Correo</label>
                        <input 
                            type="text"
                            name='email'
                            placeholder="Correo"
                            className="form-control"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.email && formik.errors.email ? (
                            <div style={{color:'red'}}>{formik.errors.email}</div>
                            ) : null}
                    </div>

                    <br/>
                    {/* <div className="confirm-button">
                        <div className="d-grid gap-2">
                            <button className="btn btn-warning btn-confirm btn-lg">Confirmar</button>
                        </div>
                        
                    </div> */}
            </form>
        </div>
    )
}
