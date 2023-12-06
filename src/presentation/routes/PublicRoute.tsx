import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

interface PublicRouteProps {
    children: ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({children}) => {
    const { userState } = useAuth();

    return !userState.logged ?
        children
        : <Navigate to="/" />
}
