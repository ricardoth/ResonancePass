import {createContext, useReducer, useContext } from 'react';
import { AuthContextProps } from '../../domain/interfaces/interfaceProps/IAuthContextProps';
import { AuthState } from '../../domain/entities/AuthState';
import { authReducer } from '../../application/reducers/authReducer';
import { AuthProviderProps } from '../../domain/interfaces/interfaceProps/IAuthProviderProps';

const initialState: AuthState = {
    logged: false,
    user: null
};

export const AuthContext = createContext<AuthContextProps>({userState: initialState, dispatch: () => null });

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [ userState, dispatch ] = useReducer(authReducer, initialState); 

    return (
        <AuthContext.Provider value={{ userState, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);