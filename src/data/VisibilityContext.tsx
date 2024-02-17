import React, { createContext, useContext, useState, ReactNode } from 'react';

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

export const VisibilityProvider: React.FC<VisibilityProviderProps> = ({ children }) => {
  const [divVisibility, setDivVisibility] = useState<DivVisibility>({
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
    gatherMana: false,
    gatherManaDescription: true,
    buildLogCabin: true,
    buildLogCabinDescription: true,
    buildLumberYard: true,
    buildLumberYardDescription: true,
    buildWarehouse: true,
  });

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