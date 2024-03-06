import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface DivVisibility {
  [key: string]: boolean;
}

export interface VisibilityContextType {
  divVisibility: DivVisibility;
}

export interface VisibilitySettersContextType {
  setVisibility: (divKey: string, condition: boolean) => void;
  toggleVisibility: (divKey: string) => void;
}

const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);
const VisibilitySettersContext = createContext<VisibilitySettersContextType | undefined>(undefined);

interface VisibilityProviderProps {
  children: ReactNode;
}

const getInitialValue = (key: string, defaultValue: number) => {
  const savedState = JSON.parse(localStorage.getItem('visibilityState') || '{}');
  return savedState[key] !== undefined ? savedState[key] : defaultValue;
};

export const VisibilityProvider: React.FC<VisibilityProviderProps> = ({ children }) => {
  const [divVisibility, setDivVisibility] = useState<DivVisibility>(() => {
    const defaultValue = {
      chopTree: true,
      mineRock: true,
      chopTreeDescription: true,
      mineRockDescription: true,
      resources: false,
      manaResouce: false,
      goldResource: true,
      foodResource: true,
      stoneResource: true,
      woodResource: true,
      timeResource: true,
      gatherMana: true,
      gatherManaDescription: true,
      gatherWood: true,
      gatherWoodDescription: true,
      buildLogCabin: true,
      buildLogCabinDescription: true,
      buildLumberYard: true,
      buildLumberYardDescription: true,
      buildStoneMine: true,
      buildStoneMineDescription: true,
      buildWarehouse: true,
      buildingsGroup: true,
      buildingsHeader: true,
      storageHeader: true,
      storageGroup: true,
      housingHeader: true,
      housingGroup: true,
      inventoryTab: false,
      explorationTab: true,
      followersTab: true,
      stats: false,
      resourceBar: false,
      goalBar: false,
    };
    const savedState = JSON.parse(localStorage.getItem('visibilityState') || '{}');
    return savedState.divVisibility || defaultValue;
  });

  // Save state to Local Storage
  useEffect(() => {
    const values = {
      divVisibility
    };
    localStorage.setItem('visibilityState', JSON.stringify(values));
  }, [divVisibility]);

  const setVisibility = (divKey: string, condition: boolean) => {
    setDivVisibility(prevState => ({
      ...prevState,
      [divKey]: condition
    }));
  };

  const toggleVisibility = (divKey: string) => {
    setDivVisibility(prevState => ({
      ...prevState,
      [divKey]: !prevState[divKey]
    }));
  };

  return (
    <VisibilityContext.Provider value={{ divVisibility}}>
      <VisibilitySettersContext.Provider value={{ setVisibility, toggleVisibility }}>
        {children}
      </VisibilitySettersContext.Provider>
    </VisibilityContext.Provider>
  );
};

export const useVisibilityContext = (): VisibilityContextType => {
  const visibilityContext = useContext(VisibilityContext);
  if (!visibilityContext) {
    throw new Error('useVisibilityContext must be used within a VisibilityProvider');
  }
  return visibilityContext;
};

export const useVisibilitySettersContext = (): VisibilitySettersContextType => {
  const visibilitySettersContext = useContext(VisibilitySettersContext);
  if (!visibilitySettersContext) {
    throw new Error('useVisibilitySettersContext must be used within a VisibilityProvider');
  }
  return visibilitySettersContext;
}