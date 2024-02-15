import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MyStatsContextType {
  charisma: number;
  setCharisma: React.Dispatch<React.SetStateAction<number>>;
}

const MyStatsContext = createContext<MyStatsContextType | undefined>(undefined);

interface StatsProviderProps {
  children: ReactNode;
}

export const StatsProvider: React.FC<StatsProviderProps> = ({ children }) => {
  const [charisma, setCharisma] = useState<number>(10);

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
