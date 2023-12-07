import { ReactNode } from 'react';
// import { useAuth } from '../context/authContext';
// import { Navigate } from 'react-router-dom';
// import { useLogin } from '../../application/hooks/useLogin';

interface PublicRouteProps {
    children: ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({children}) => {
    // const { user } = useAuth();
    // const isLogged = useLogin();

    // localStorage.setItem('lastPath', pathname + search);

    // return !user.logged ?
    //     children
    //     : <Navigate to="/" />
    return children;
}
