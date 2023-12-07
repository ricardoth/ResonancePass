import { ReactNode } from 'react';
// import { useAuth } from '../context/authContext';
// import { useLogin } from '../../application/hooks/useLogin';

interface PublicRouteProps {
    children: ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({children}) => {
    // const { loginState } = useAuth();
    // const isLogged = useLogin();

    // localStorage.setItem('lastPath', pathname + search);

    // return !loginState.logged ?
    //     children
    //     : <Navigate to="/" />
    return children;
}
