import { createContext, useState, useContext } from 'react';


const AppProviderContext = createContext();

export const AppProvider = ({ children }) => {
  
  const [routine, setRoutine] = useState(null);
  const updateRoutine = (newValue) => {
    setRoutine(newValue);
  };

  return (
    <AppProviderContext.Provider value={{ routine, updateRoutine  }}>
      {children}
    </AppProviderContext.Provider>
  );
};

export const useAppProvider = () => {
  return useContext(AppProviderContext);
};
