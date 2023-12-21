import { createContext, useContext, useReducer } from "react";
import { ticketReducer } from "../../application/reducers/ticketReducer";
import { TicketState } from "../../domain/contextStates/TicketState";

const initialState: TicketState = {
    tickets: []
};

interface TicketContextType {
    ticketState: TicketState;
    ticketDispatch: React.Dispatch<any>;
  }

export const TicketContext = createContext<TicketContextType>({ticketState: initialState, ticketDispatch: () => null });

export const TicketProvider: React.FC<any> = ({ children }) => {
    const initialState = {
        tickets: []
    };

    const [ ticketState, ticketDispatch ] = useReducer(ticketReducer, initialState);

    return (
        <TicketContext.Provider value={{ticketState, ticketDispatch}}>
            {children}
        </TicketContext.Provider>
    );
}

export const useTicket = () => useContext(TicketContext);