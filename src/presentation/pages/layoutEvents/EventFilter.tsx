import './EventFilter.css';

export const EventFilter = () => {
    return (
        <form className="form-container-event animate__animated animate__zoomIn">
            <select className='form-select' placeholder='Buscar un Evento Select2'>
                <option>WNEA</option>
            </select>
            <select className='form-select' placeholder='Por Región'>
                <option>WNEA</option>
            </select>
            <select className='form-select' placeholder='Por Comuna'>
                <option>WNEA</option> 
            </select>
            <button className='btn btn-warning'><strong>Buscar</strong></button>
        </form>
        
    )
}
