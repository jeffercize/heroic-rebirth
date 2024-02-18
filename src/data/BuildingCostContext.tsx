import React, { createContext, useContext, ReactNode, useState } from 'react';

export interface BuildingCostContextType {
  lumberyardWoodCost: number;
  lumberyardStoneCost: number;
  stoneMineWoodCost: number;
  stoneMineStoneCost: number;
  warehouseWoodCost: number;
  warehouseStoneCost: number;
  logCabinWoodCost: number;
  logCabinStoneCost: number;
}

export interface BuildingCostSettersContextType {
  setLumberyardWoodCost: (newValue: number) => void;
  setLumberyardStoneCost: (newValue: number) => void;
  setStoneMineWoodCost: (newValue: number) => void;
  setStoneMineStoneCost: (newValue: number) => void;
  setWarehouseWoodCost: (newValue: number) => void;
  setWarehouseStoneCost: (newValue: number) => void;
  setLogCabinWoodCost: (newValue: number) => void;
  setLogCabinStoneCost: (newValue: number) => void;
}

const BuildingCostContext = createContext<BuildingCostContextType | undefined>(undefined);
const BuildingCostSettersContext = createContext<BuildingCostSettersContextType | undefined>(undefined);

interface BuildingCostProviderProps {
  children: ReactNode;
}

export const BuildingCostProvider: React.FC<BuildingCostProviderProps> = ({ children }) => {
  const [lumberyardWoodCost, setLumberyardWoodCost] = useState<number>(15);
  const [lumberyardStoneCost, setLumberyardStoneCost] = useState<number>(5);
  const [stoneMineWoodCost, setStoneMineWoodCost] = useState<number>(4);
  const [stoneMineStoneCost, setStoneMineStoneCost] = useState<number>(10);
  const [warehouseWoodCost, setWarehouseWoodCost] = useState<number>(30);
  const [warehouseStoneCost, setWarehouseStoneCost] = useState<number>(12);
  const [logCabinWoodCost, setLogCabinWoodCost] = useState<number>(5);
  const [logCabinStoneCost, setLogCabinStoneCost] = useState<number>(2);

  const values = { 
    lumberyardWoodCost, 
    lumberyardStoneCost, 
    stoneMineWoodCost, 
    stoneMineStoneCost, 
    warehouseWoodCost, 
    warehouseStoneCost, 
    logCabinWoodCost, 
    logCabinStoneCost, 
  };
  
  const setters = {
    setLumberyardWoodCost,
    setLumberyardStoneCost,
    setStoneMineWoodCost,
    setStoneMineStoneCost,
    setWarehouseWoodCost,
    setWarehouseStoneCost,
    setLogCabinWoodCost,
    setLogCabinStoneCost,
  };

  return (
    <BuildingCostContext.Provider value={values}>
      <BuildingCostSettersContext.Provider value={setters}>
        {children}
      </BuildingCostSettersContext.Provider>
    </BuildingCostContext.Provider>
  );
};

export const useBuildingCostContext = (): BuildingCostContextType => {
  const context = useContext(BuildingCostContext);
  if (!context) {
    throw new Error('useBuildingCostContext must be used within a BuildingCostProvider');
  }
  return context;
};

export const useBuildingCostSettersContext = (): BuildingCostSettersContextType => {
  const context = useContext(BuildingCostSettersContext);
  if (!context) {
    throw new Error('useBuildingCostSettersContext must be used within a BuildingCostProvider');
  }
  return context;
};