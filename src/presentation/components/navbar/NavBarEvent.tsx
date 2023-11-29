import { useEffect, useRef } from 'react';
import { Link, useNavigate,  } from 'react-router-dom';
import resonanceImg from '../../../assets/images/resonancePassBGWhite.png';
import './Navbar.css';

export const NavbarEvent = () => {
    const navigate = useNavigate();
    const topRef = useRef<HTMLElement>(null);

    const handleBackScreen = () => {
        navigate('/');
    }

    useEffect(() => {
        topRef.current?.scrollIntoView();
    }, [])

    return (
        <>
            <nav ref={topRef} className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={"/"}>
                        <img src={resonanceImg} width={100} alt="Logo" />
                    </Link> 
                    <button className='btn btn-outline-light me-2' onClick={handleBackScreen}> <i className='bi bi-arrow-bar-left'></i> Volver</button>
                </div>
            </nav>
        </>
    )
}
