// context/RouteHistoryContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

interface RouteHistoryContextType {
  previousPath: string;
}

const RouteHistoryContext = createContext<RouteHistoryContextType>({ previousPath: '' });

export const RouteHistoryProvider: React.FC<any> = ({ children }) => {
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
    <RouteHistoryContext.Provider value={{ previousPath }}>
      {children}
    </RouteHistoryContext.Provider>
  );
};

export const useRouteHistory = () => useContext(RouteHistoryContext);
