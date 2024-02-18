import React, { createContext, useContext, ReactNode, useState } from 'react';

export interface MyFollowersContextType {
  freeFollowers: number;
  totalFollowers: number;
  maxFollowers: number;
  possibleFollowers: number;
  lumberyard: number;
  maxLumberyard: number;
  stoneMine: number;
  maxStoneMine: number;
}

export interface MyFollowersSettersContextType {
  setFreeFollowers: (newValue: number) => void;
  setTotalFollowers: (newValue: number) => void;
  setMaxFollowers: (newValue: number) => void;
  setPossibleFollowers: (newValue: number) => void;
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
  const [freeFollowers, setFreeFollowers] = useState<number>(0);
  const [totalFollowers, setTotalFollowers] = useState<number>(0);

  const [maxFollowers, setMaxFollowers] = useState<number>(0);
  const [possibleFollowers, setPossibleFollowers] = useState<number>(0);

  const [lumberyard, setLumberyard] = useState<number>(0);
  const [maxLumberyard, setMaxLumberyard] = useState<number>(5);

  const [stoneMine, setStoneMine] = useState<number>(0);
  const [maxStoneMine, setMaxStoneMine] = useState<number>(5);

  const values = { freeFollowers, totalFollowers, maxFollowers, possibleFollowers, lumberyard, maxLumberyard, stoneMine, maxStoneMine };
  const setters = {
    setFreeFollowers: (newValue: number) => setFreeFollowers(Math.max(0, Math.min(newValue, totalFollowers))),
    setTotalFollowers: (newValue: number) => setTotalFollowers(Math.max(0, Math.min(newValue, maxFollowers))),
    setMaxFollowers: (newValue: number) => setMaxFollowers(Math.max(0, newValue)),
    setPossibleFollowers: (newValue: number) => setPossibleFollowers(Math.max(0, newValue)),
    setLumberyard: (newValue: number) => setLumberyard(Math.max(0, Math.min(newValue, maxLumberyard))),
    setMaxLumberyard: (newValue: number) => setMaxLumberyard(Math.max(0, newValue)),
    setStoneMine: (newValue: number) => setStoneMine(Math.max(0, Math.min(newValue, maxStoneMine))),
    setMaxStoneMine: (newValue: number) => setMaxStoneMine(Math.max(0, newValue)),
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