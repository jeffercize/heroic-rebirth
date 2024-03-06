import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface MyStatsContextType {
  strength: number;
  strengthSecond: number;
}

export interface MyStatsSettersContextType {
  setStrength: React.Dispatch<React.SetStateAction<number>>;
  setStrengthSecond: React.Dispatch<React.SetStateAction<number>>;
}

const MyStatsContext = createContext<MyStatsContextType | undefined>(undefined);
const MyStatsSettersContext = createContext<MyStatsSettersContextType | undefined>(undefined);


interface StatsProviderProps {
  children: ReactNode;
}

const getInitialValue = (key: string, defaultValue: number) => {
  const savedState = JSON.parse(localStorage.getItem('statsContext') || '{}');
  return savedState[key] !== undefined ? savedState[key] : defaultValue;
};

export const StatsProvider: React.FC<StatsProviderProps> = ({ children }) => {
  const [strength, setStrength] = useState<number>(() => getInitialValue('strength', 0));
  const [strengthSecond, setStrengthSecond] = useState<number>(() => getInitialValue('strengthSecond', 0));

  const values = { strength, strengthSecond};
  const setters = { setStrength, setStrengthSecond };


    // Save state to Local Storage
    useEffect(() => {
      localStorage.setItem('statsContext', JSON.stringify(values));
    }, [values]);
  

  return (
    <MyStatsContext.Provider value={values}>
      <MyStatsSettersContext.Provider value={setters}>
        {children}      
      </MyStatsSettersContext.Provider>
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

export const useMyStatsSettersContext = (): MyStatsSettersContextType => {
  const context = useContext(MyStatsSettersContext);
  if (!context) {
    throw new Error('useMyStatsSettersContext must be used within a StatsProvider');
  }
  return context;
};