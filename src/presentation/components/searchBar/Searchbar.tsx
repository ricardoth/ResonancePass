import './Searchbar.css';

export const Searchbar = () => {
    return (
        <>
            <div className="d-flex justify-content-center flex-grow-1 pe-3 form-search">
                <div className='input-icon-container'>
                    <input className="form-control form-control-lg input-with-icon" type="search" placeholder="Buscar Evento o Artista" aria-label="Buscar" />
                    <i className='bi bi-search icon'></i>
                </div>
                {/* &nbsp; */}
                {/* <button className="btn btn-outline-dark" type="submit">Buscar </button> */}
                
            </div>
        </>
    )
}
