import { AuthState, AuthAction } from '../../domain/entities/AuthState';

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                logged: true,
                user: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                logged: false,
                user: null
            };
        default:
            return state;
    }
};
