import React, { createContext, useContext, ReactNode, useState, useEffect, useRef } from 'react';

export interface MyFollowersContextType {
  freeFollowers: number;
  totalFollowers: number;
  maxFollowers: number;
  possibleFollowers: number;
  lumberyard: number;
  maxLumberyard: number;
  stoneMine: number;
  maxStoneMine: number;
  lumberyardAutoAssign: number;
  stoneMineAutoAssign: number;
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
  setLumberyardAutoAssign: (newValue: number) => void;
  setStoneMineAutoAssign: (newValue: number) => void;
}

const MyFollowersContextType = createContext<MyFollowersContextType | undefined>(undefined);
const MyFollowersSettersContextType = createContext<MyFollowersSettersContextType | undefined>(undefined);

interface FollowersProviderProps {
  children: ReactNode;
}

const getInitialValue = (key: string, defaultValue: number) => {
  const savedState = JSON.parse(localStorage.getItem('followersState') || '{}');
  return savedState[key] !== undefined ? savedState[key] : defaultValue;
};

export const FollowersProvider: React.FC<FollowersProviderProps> = ({ children }) => {
  const [freeFollowers, setFreeFollowers] = useState<number>(() => getInitialValue('freeFollowers', 0));
  const [totalFollowers, setTotalFollowers] = useState<number>(() => getInitialValue('totalFollowers', 0));
  const [maxFollowers, setMaxFollowers] = useState<number>(() => getInitialValue('maxFollowers', 0));
  const [possibleFollowers, setPossibleFollowers] = useState<number>(() => getInitialValue('possibleFollowers', 0));
  const [lumberyard, setLumberyard] = useState<number>(() => getInitialValue('lumberyard', 0));
  const [maxLumberyard, setMaxLumberyard] = useState<number>(() => getInitialValue('maxLumberyard', 0));
  const [stoneMine, setStoneMine] = useState<number>(() => getInitialValue('stoneMine', 0));
  const [maxStoneMine, setMaxStoneMine] = useState<number>(() => getInitialValue('maxStoneMine', 0));
  const [lumberyardAutoAssign, setLumberyardAutoAssign] = useState<number>(() => getInitialValue('lumberyardAutoAssign', 1));
  const [stoneMineAutoAssign, setStoneMineAutoAssign] = useState<number>(() => getInitialValue('stoneMineAutoAssign', 1));

  const values = { 
    freeFollowers, totalFollowers, maxFollowers, possibleFollowers, 
    lumberyard, maxLumberyard, stoneMine, maxStoneMine, 
    lumberyardAutoAssign, stoneMineAutoAssign 
  };

  
  // Save state to Local Storage
  useEffect(() => {
    localStorage.setItem('followersState', JSON.stringify(values));
  }, [values]);

  const setters = {
    setFreeFollowers: (newValue: number) => setFreeFollowers(Math.max(0, Math.min(newValue, totalFollowers))),
    setTotalFollowers: (newValue: number) => setTotalFollowers(Math.max(0, Math.min(newValue, maxFollowers))),
    setMaxFollowers: (newValue: number) => setMaxFollowers(Math.max(0, newValue)),
    setPossibleFollowers: (newValue: number) => setPossibleFollowers(Math.max(0, newValue)),
    setLumberyard: (newValue: number) => setLumberyard(Math.max(0, Math.min(newValue, maxLumberyard))),
    setMaxLumberyard: (newValue: number) => setMaxLumberyard(Math.max(0, newValue)),
    setStoneMine: (newValue: number) => setStoneMine(Math.max(0, Math.min(newValue, maxStoneMine))),
    setMaxStoneMine: (newValue: number) => setMaxStoneMine(Math.max(0, newValue)),
    setLumberyardAutoAssign,
    setStoneMineAutoAssign
  };

  useEffect(() => {
    setTotalFollowers(maxFollowers)
  }, [maxFollowers]);

  const prevTotalFollowersRef = useRef(totalFollowers);
  useEffect(() => {
    const prevTotalFollowers = prevTotalFollowersRef.current;
    const difference = totalFollowers - prevTotalFollowers;
    setFreeFollowers(freeFollowers + difference);
    prevTotalFollowersRef.current = totalFollowers;
  }, [totalFollowers]);

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