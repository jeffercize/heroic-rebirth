import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface MyStatsContextType {
  charisma: number;
  setCharisma: React.Dispatch<React.SetStateAction<number>>;
}

const MyStatsContext = createContext<MyStatsContextType | undefined>(undefined);

interface StatsProviderProps {
  children: ReactNode;
}

const getInitialValue = (key: string, defaultValue: number) => {
  const savedState = JSON.parse(localStorage.getItem('statsContext') || '{}');
  return savedState[key] !== undefined ? savedState[key] : defaultValue;
};

export const StatsProvider: React.FC<StatsProviderProps> = ({ children }) => {
  const [charisma, setCharisma] = useState<number>(10);

    // Save state to Local Storage
    useEffect(() => {
      localStorage.setItem('statsContext', JSON.stringify(charisma));
    }, [charisma]);
  

  return (
    <MyStatsContext.Provider value={{ charisma, setCharisma}}>
      {children}
    </MyStatsContext.Provider>
  );
};

export const useMyStatsContext = (): MyStatsContextType => {
  const StatsContext = useContext(MyStatsContext);
  if (!StatsContext) {
    throw new Error('useMyStatsContext must be used within a StatsProvider');
  }
  return StatsContext;
};
