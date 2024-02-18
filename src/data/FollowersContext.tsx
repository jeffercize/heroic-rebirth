import React, { createContext, useContext, ReactNode, useState } from 'react';

export interface MyFollowersContextType {
  lumberyard: number;
  maxLumberyard: number;
  stoneMine: number;
  maxStoneMine: number;
}

export interface MyFollowersSettersContextType {
  setLumberyard: (newValue: number) => void;
  setMaxLumberyard: (newValue: number) => void;
  setStoneMine: (newValue: number) => void;
  setMaxStoneMine: (newValue: number) => void;
}

const MyFollowersContextType = createContext<MyFollowersContextType | undefined>(undefined);
const MyFollowersSettersContextType = createContext<MyFollowersSettersContextType | undefined>(undefined);

interface FollowersProviderProps {
  children: ReactNode;
}

export const FollowersProvider: React.FC<FollowersProviderProps> = ({ children }) => {
  const [lumberyard, setLumberyard] = useState<number>(0);
  const [maxLumberyard, setMaxLumberyard] = useState<number>(5);

  const [stoneMine, setStoneMine] = useState<number>(0);
  const [maxStoneMine, setMaxStoneMine] = useState<number>(5);

  const values = { lumberyard, maxLumberyard, stoneMine, maxStoneMine };
  const setters = {
    setLumberyard: (newValue: number) => setLumberyard(Math.max(0, Math.min(newValue, maxLumberyard))),
    setMaxLumberyard,
    setStoneMine: (newValue: number) => setStoneMine(Math.max(0, Math.min(newValue, maxStoneMine))),
    setMaxStoneMine,
  };

  return (
    <MyFollowersContextType.Provider value={values}>
      <MyFollowersSettersContextType.Provider value={setters}>
        {children}
      </MyFollowersSettersContextType.Provider>
    </MyFollowersContextType.Provider>
  );
};

export const useMyFollowersContext = (): MyFollowersContextType => {
  const context = useContext(MyFollowersContextType);
  if (!context) {
    throw new Error('useMyResourcesContext must be used within a ResourcesProvider');
  }
  return context;
};

export const useMyFollowersSettersContext = (): MyFollowersSettersContextType => {
  const context = useContext(MyFollowersSettersContextType);
  if (!context) {
    throw new Error('useMyResourcesSettersContext must be used within a ResourcesProvider');
  }
  return context;
};