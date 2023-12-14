import { Buffer } from 'buffer';
import { environment } from '../../../environment/environment.dev';
import { basicAuth } from '../../../types/basicAuth';
import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';
import './MyTickets.css';
import DataTable from 'react-data-table-component';
import { formatDateHour } from '../../../utils/formatDateOption';
import { formatCurrency } from '../../../types/currency';
import { openPdfWindow } from '../../../utils/pdfBlobOption';
import { TicketQR } from '../../../domain/entities/TicketQR';
import { LoaderFullScreen } from '../../components/loader/LoaderFullScreen';
import { Ticket } from '../../../domain/entities/Ticket';
import { Meta } from '../../../domain/valueObjects/Meta';
import { customPaginationOptions } from '../../../types/datatableConfig';
import { NavbarEvent } from '../../components/navbar/NavBarEvent';

const URL_GET_TICKETS = environment.UrlTickets;
const URL_VIEW_PDF = environment.UrlTickets + "/GetTicketVoucherPDF";
const userBasicAuth = basicAuth.username;
const passBasicAuth = basicAuth.password;


export const MyTickets = () => {
    const { loginState } = useContext(AuthContext);
    const [ myTickets, setMyTickets] = useState([]);
    const [ meta, setMeta ] = useState<Meta>({} as Meta);
    // const [ loading, setLoading ] = useState(false);
    const [ page, setPage ] = useState(1);

    const fetchTickets = async (page: number, row: number = 10) => {
        try {
            // setLoading(true);
            let response = await axios.get(`${URL_GET_TICKETS}?PageSize=${row}&PageNumber=${page}&IdUsuario=${loginState.user.idUsuario}`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                }
            });
            let {data, meta} = response.data;
            setMyTickets(data);
            setMeta(meta);
            // setLoading(false);
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.Message);
            // setLoading(false);
        }
    }

    useEffect(() => {
        fetchTickets(page);
    }, [page]);

    if ( meta === undefined || myTickets.length === 0) return <><NavbarEvent /><LoaderFullScreen /></>;

    const viewPDFTicket = async (paramTicket: any) => {
        try {
            // setLoading(true);
            let response = await axios.get(URL_VIEW_PDF + `?idTicket=${paramTicket.idTicket}`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${userBasicAuth}:${passBasicAuth}`).toString('base64')}`,
                }
            });
           
            let pdfData: TicketQR = response.data.data;
            openPdfWindow(pdfData.nombreTicketComprobante)
            // setLoading(false);
        } catch (error: any) {
            toast.error(error.response.Message);
            // setLoading(false);
        }
    }

    const columns: any = [
        {
            name: 'N° Ticket',
            selector: (row: Ticket) => row.idTicket,
            sortable: true
        },
        {
            name: 'Fecha Compra',
            selector: (row: Ticket) => formatDateHour(row.fechaTicket),
            sortable: true
        },
        {
            name: 'Evento',
            selector: (row: Ticket) => row.evento?.nombreEvento,
            sortable: true
        },
        {
            name: 'Sector',
            selector: (row: Ticket) => row.sector?.nombreSector,
            sortable: true
        },
        {
            name: 'Medio Pago',
            selector: (row: Ticket) => row.medioPago?.descripcion,
            sortable: true
        },
        {
            name: 'Total',
            selector: (row: Ticket) => formatCurrency(row.montoTotal, 'CLP'),
            sortable: true
        },
        {
            name: "Acciones",
            selector:  (row: Ticket) => 
                <div key={row.idTicket}>
                    <button className='btn btn-outline-dark' onClick={ () => viewPDFTicket(row)}>
                        Visualizar &nbsp;
                        <i className="bi bi-filetype-pdf"></i>
                    </button>
                </div>
        }
    ];

    const handlePageChange = (page: number) => {
        setPage(page);
    }

    const handleRowsChange = (row: number) => {
        fetchTickets(1, row);
    }

    return (
        <>
            <NavbarEvent />
            <section className='container-my-tickets'>
                <h3><strong>{loginState.user.nombres} {loginState.user.apellidoP} {loginState.user.apellidoM}</strong></h3>
               
                <DataTable 
                    columns={columns}
                    data={myTickets}
                    pagination
                    paginationServer
                    paginationTotalRows={meta.totalCount}
                    paginationComponentOptions={customPaginationOptions}
                    responsive
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleRowsChange}
                    noDataComponent={`No hay tickets para mostrar`}
                />
            </section>
        </>
    )
}
