import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext, useAuth } from '../context/authContext';

interface PublicRouteProps {
    children: ReactNode;
}


export const PublicRoute: React.FC<PublicRouteProps> = ({children}) => {
    const { userState, dispatch } = useAuth();

    return !userState.logged ?
        children
        : <Navigate to="/" />;

}
