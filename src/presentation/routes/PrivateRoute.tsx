import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

interface PrivateRouteProps {
    children: ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
    const { loginState } = useAuth();
    const { pathname, search } = useLocation();

    localStorage.setItem('lastPath', pathname + search);

    return loginState.logged
        ? children
        : <Navigate to="/login" />
}
