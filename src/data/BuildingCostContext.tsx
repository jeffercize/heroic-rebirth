import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

export interface BuildingCostContextType {
  lumberyardWoodCost: number;
  lumberyardStoneCost: number;
  stoneMineWoodCost: number;
  stoneMineStoneCost: number;
  warehouseWoodCost: number;
  warehouseStoneCost: number;
  logCabinWoodCost: number;
  logCabinStoneCost: number;
  lumberyardCost: number;
  stoneMineCost: number;
  warehouseCost: number;
  logCabinCost: number;
  lumberyardWoodCostRatio: number;
  lumberyardStoneCostRatio: number;
  stoneMineWoodCostRatio: number;
  stoneMineStoneCostRatio: number;
  warehouseWoodCostRatio: number;
  warehouseStoneCostRatio: number;
  logCabinWoodCostRatio: number;
  logCabinStoneCostRatio: number;
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
  setLumberyardCost: (newValue: number) => void;
  setStoneMineCost: (newValue: number) => void;
  setWarehouseCost: (newValue: number) => void;
  setLogCabinCost: (newValue: number) => void;
  setLumberyardWoodCostRatio: (newValue: number) => void;
  setLumberyardStoneCostRatio: (newValue: number) => void;
  setStoneMineWoodCostRatio: (newValue: number) => void;
  setStoneMineStoneCostRatio: (newValue: number) => void;
  setWarehouseWoodCostRatio: (newValue: number) => void;
  setWarehouseStoneCostRatio: (newValue: number) => void;
  setLogCabinWoodCostRatio: (newValue: number) => void;
  setLogCabinStoneCostRatio: (newValue: number) => void;
}

const BuildingCostContext = createContext<BuildingCostContextType | undefined>(undefined);
const BuildingCostSettersContext = createContext<BuildingCostSettersContextType | undefined>(undefined);

interface BuildingCostProviderProps {
  children: ReactNode;
}

const getInitialValue = (key: string, defaultValue: number) => {
  const savedState = JSON.parse(localStorage.getItem('buildingCostContext') || '{}');
  return savedState[key] !== undefined ? savedState[key] : defaultValue;
};

export const BuildingCostProvider: React.FC<BuildingCostProviderProps> = ({ children }) => {
  const [lumberyardWoodCost, setLumberyardWoodCost] = useState<number>(() => getInitialValue('lumberyardWoodCost', 10));
  const [lumberyardStoneCost, setLumberyardStoneCost] = useState<number>(() => getInitialValue('lumberyardStoneCost', 3));
  const [stoneMineWoodCost, setStoneMineWoodCost] = useState<number>(() => getInitialValue('stoneMineWoodCost', 7));
  const [stoneMineStoneCost, setStoneMineStoneCost] = useState<number>(() => getInitialValue('stoneMineStoneCost', 10));
  const [warehouseWoodCost, setWarehouseWoodCost] = useState<number>(() => getInitialValue('warehouseWoodCost', 18));
  const [warehouseStoneCost, setWarehouseStoneCost] = useState<number>(() => getInitialValue('warehouseStoneCost', 12));
  const [logCabinWoodCost, setLogCabinWoodCost] = useState<number>(() => getInitialValue('logCabinWoodCost', 4));
  const [logCabinStoneCost, setLogCabinStoneCost] = useState<number>(() => getInitialValue('logCabinStoneCost', 2));
  const [lumberyardCost, setLumberyardCost] = useState<number>(() => getInitialValue('lumberyardCost', 7));
  const [stoneMineCost, setStoneMineCost] = useState<number>(() => getInitialValue('stoneMineCost', 7));
  const [warehouseCost, setWarehouseCost] = useState<number>(() => getInitialValue('warehouseCost', 10));
  const [logCabinCost, setLogCabinCost] = useState<number>(() => getInitialValue('logCabinCost', 10));
  const [lumberyardWoodCostRatio, setLumberyardWoodCostRatio] = useState<number>(() => getInitialValue('lumberyardWoodCostRatio', 1.5));
  const [lumberyardStoneCostRatio, setLumberyardStoneCostRatio] = useState<number>(() => getInitialValue('lumberyardStoneCostRatio', 0.5));
  const [stoneMineWoodCostRatio, setStoneMineWoodCostRatio] = useState<number>(() => getInitialValue('stoneMineWoodCostRatio', 0.7));
  const [stoneMineStoneCostRatio, setStoneMineStoneCostRatio] = useState<number>(() => getInitialValue('stoneMineStoneCostRatio', 1));
  const [warehouseWoodCostRatio, setWarehouseWoodCostRatio] = useState<number>(() => getInitialValue('warehouseWoodCostRatio', 3.0));
  const [warehouseStoneCostRatio, setWarehouseStoneCostRatio] = useState<number>(() => getInitialValue('warehouseStoneCostRatio', 1.2));
  const [logCabinWoodCostRatio, setLogCabinWoodCostRatio] = useState<number>(() => getInitialValue('logCabinWoodCostRatio', 0.5));
  const [logCabinStoneCostRatio, setLogCabinStoneCostRatio] = useState<number>(() => getInitialValue('logCabinStoneCostRatio', 0.2));


  const values = { 
    lumberyardWoodCost, 
    lumberyardStoneCost, 
    stoneMineWoodCost, 
    stoneMineStoneCost, 
    warehouseWoodCost, 
    warehouseStoneCost, 
    logCabinWoodCost, 
    logCabinStoneCost, 
    lumberyardCost,
    stoneMineCost,
    warehouseCost,
    logCabinCost,
    lumberyardWoodCostRatio,
    lumberyardStoneCostRatio,
    stoneMineWoodCostRatio,
    stoneMineStoneCostRatio,
    warehouseWoodCostRatio,
    warehouseStoneCostRatio,
    logCabinWoodCostRatio,
    logCabinStoneCostRatio,
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
    setLumberyardCost,
    setStoneMineCost,
    setWarehouseCost,
    setLogCabinCost,
    setLumberyardWoodCostRatio,
    setLumberyardStoneCostRatio,
    setStoneMineWoodCostRatio,
    setStoneMineStoneCostRatio,
    setWarehouseWoodCostRatio,
    setWarehouseStoneCostRatio,
    setLogCabinWoodCostRatio,
    setLogCabinStoneCostRatio,
  };

    // Save state to Local Storage
    useEffect(() => {
      localStorage.setItem('buildingCostContext', JSON.stringify(values));
    }, [values]);

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