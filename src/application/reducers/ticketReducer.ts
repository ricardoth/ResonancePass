import { types } from "../../types/types";

export const ticketReducer = (state: any, action: any) => {
    switch (types.saveTickets) {
        case types.saveTickets:
            return {
                ...state, 
                tickets: action.payload
            }

        case types.clearTickets:
            return {
                ...state,
                tickets: null
            };
        default:
            return state;
    }
}