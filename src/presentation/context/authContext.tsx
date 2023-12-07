import {createContext, useReducer, useContext } from 'react';
import { AuthContextProps } from '../../domain/interfaces/interfaceProps/IAuthContextProps';
import { AuthState } from '../../domain/entities/AuthState';
import { authReducer } from '../../application/reducers/authReducer';
import { AuthProviderProps } from '../../domain/interfaces/interfaceProps/IAuthProviderProps';

const initialState: AuthState = {
    logged: false,
    user: null
};

export const AuthContext = createContext<AuthContextProps>({loginState: initialState, dispatch: () => null });

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [ loginState, dispatch ] = useReducer(authReducer, initialState); 

    return (
        <AuthContext.Provider value={{ loginState, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);