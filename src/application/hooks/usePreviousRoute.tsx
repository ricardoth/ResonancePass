// hooks/useStoreCurrentPath.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useStoreCurrentPath = () => {
    const location = useLocation();

    useEffect(() => {
        // Almacenar la ruta actual en sessionStorage
        sessionStorage.setItem('previousPath', location.pathname);
    }, [location]);
};
