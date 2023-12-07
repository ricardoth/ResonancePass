import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteProps {
    children: any
}

const RouteTracker: React.FC<RouteProps> = ({ children }) => {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState<string>('');
    const [previousPath, setPreviousPath] = useState<string>('');

    useEffect(() => {
        if (location.pathname !== currentPath) {
            setPreviousPath(currentPath);
            setCurrentPath(location.pathname);
        }
    }, [location, currentPath]);

    return (
        <>
            {children}
        </>
    );
};

export default RouteTracker;
