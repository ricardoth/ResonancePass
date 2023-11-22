import { useLocation } from 'react-router-dom';
import { Navbar } from '../../components/navbar/Navbar';
import { EventFooter } from './EventFooter';

import { formatDateLocaleString } from '../../../utils/formatDateOption';
import { EventTablePrices } from './EventTablePrices';
import './EventScreen.css';

export const EventScreen = () => {
    const location = useLocation();
    const eventState = location.state?.rowParam;
    const idEvento = eventState.idEvento;
    const backgroundImage = `url('data:image/jpeg; base64, ${eventState.contenidoFlyer} ')`;

    return (
        <>
            <Navbar />
                <div style={{ backgroundImage, height: '120vh', backgroundSize: 'cover'}}>
                    <div className='info-evento'>
                        {/* <h1 className='text-white p-5'>{eventState.nombreEvento}</h1> */}
                        <h1 className='display-1 text-white texto-border'>{formatDateLocaleString(eventState.fecha)}</h1>

                    </div>
                    <EventTablePrices evento={idEvento} />
                </div>
            <EventFooter /> 
        </>
        
    )
}


  