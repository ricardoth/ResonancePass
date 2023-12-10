import {createContext, useReducer, useContext } from 'react';
import { AuthContextProps } from '../../domain/interfaces/interfaceProps/IAuthContextProps';
import { AuthState } from '../../domain/entities/AuthState';
import { authReducer } from '../../application/reducers/authReducer';
import { AuthProviderProps } from '../../domain/interfaces/interfaceProps/IAuthProviderProps';

const initialState: AuthState = {
    logged: false,
    user: null
};

const init = (): AuthState => {
    const storedData = localStorage.getItem('loginState');
    if (storedData) {
        try {
            return JSON.parse(storedData);
        } catch (error) {
            console.error('Error parsing stored auth data', error);
        }
    }
    return initialState;
};

export const AuthContext = createContext<AuthContextProps>({loginState: initialState, dispatchLoginState: () => null });

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [ loginState, dispatchLoginState ] = useReducer(authReducer, initialState, init); 
 
    return (
        <AuthContext.Provider value={{ loginState, dispatchLoginState }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);