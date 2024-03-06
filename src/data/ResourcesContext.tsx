import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

export interface MyResourcesContextType {
  time: number;
  maxTime: number;
  timeSecond: number;
  mana: number;
  maxMana: number;
  manaSecond: number;
  gold: number;
  maxGold: number;
  goldSecond: number;
  food: number;
  maxFood: number;
  foodSecond: number;
  stone: number;
  maxStone: number;
  stoneSecond: number;
  wood: number;
  maxWood: number;
  woodSecond: number;
  warehouses: number;
}

export interface MyResourcesSettersContextType {
  setTime: (newValue: number) => void;
  setMaxTime: (newValue: number) => void;
  setTimeSecond: (newValue: number) => void;
  setMana: (newValue: number) => void;
  setMaxMana: (newValue: number) => void;
  setManaSecond: (newValue: number) => void;
  setGold: (newValue: number) => void;
  setMaxGold: (newValue: number) => void;
  setGoldSecond: (newValue: number) => void;
  setFood: (newValue: number) => void;
  setMaxFood: (newValue: number) => void;
  setFoodSecond: (newValue: number) => void;
  setStone: (newValue: number) => void;
  setMaxStone: (newValue: number) => void;
  setStoneSecond: (newValue: number) => void;
  setWood: (newValue: number) => void;
  incrementWood: (incrementValue: number) => void;
  setMaxWood: (newValue: number) => void;
  setWoodSecond: (newValue: number) => void;
  setWarehouses: (newValue: number) => void;
}

const MyResourcesContext = createContext<MyResourcesContextType | undefined>(undefined);
const MyResourcesSettersContext = createContext<MyResourcesSettersContextType | undefined>(undefined);

interface ResourcesProviderProps {
  children: ReactNode;
}


const getInitialValue = (key: string, defaultValue: number) => {
  const savedState = JSON.parse(localStorage.getItem('resourcesState') || '{}');
  return savedState[key] !== undefined ? savedState[key] : defaultValue;
};

export const ResourcesProvider: React.FC<ResourcesProviderProps> = ({ children }) => {
  const [time, setTime] = useState<number>(() => getInitialValue('time', 0));
  const [maxTime, setMaxTime] = useState<number>(() => getInitialValue('maxTime', 30000));
  const [timeSecond, setTimeSecond] = useState<number>(() => getInitialValue('timeSecond', 0));
  
  const [mana, setMana] = useState<number>(() => getInitialValue('mana', 100));
  const [maxMana, setMaxMana] = useState<number>(() => getInitialValue('maxMana', 100));
  const [manaSecond, setManaSecond] = useState<number>(() => getInitialValue('manaSecond', 1));
  
  const [gold, setGold] = useState<number>(() => getInitialValue('gold', 0));
  const [maxGold, setMaxGold] = useState<number>(() => getInitialValue('maxGold', 100));
  const [goldSecond, setGoldSecond] = useState<number>(() => getInitialValue('goldSecond', 0));
  
  const [food, setFood] = useState<number>(() => getInitialValue('food', 0));
  const [maxFood, setMaxFood] = useState<number>(() => getInitialValue('maxFood', 200));
  const [foodSecond, setFoodSecond] = useState<number>(() => getInitialValue('foodSecond', 0));
  
  const [stone, setStone] = useState<number>(() => getInitialValue('stone', 0));
  const [maxStone, setMaxStone] = useState<number>(() => getInitialValue('maxStone', 100));
  const [stoneSecond, setStoneSecond] = useState<number>(() => getInitialValue('stoneSecond', 0));
  
  const [wood, setWood] = useState<number>(() => getInitialValue('wood', 0));
  const [maxWood, setMaxWood] = useState<number>(() => getInitialValue('maxWood', 2000000));
  const [woodSecond, setWoodSecond] = useState<number>(() => getInitialValue('woodSecond', 0));
  
  const [warehouses, setWarehouses] = useState<number>(() => getInitialValue('warehouses', 0));

  const values = { time, maxTime, timeSecond, mana, maxMana, manaSecond, gold, maxGold, goldSecond, food, maxFood, foodSecond, stone, maxStone, stoneSecond, wood, maxWood, woodSecond, warehouses};
  const setters = {
    setTime: (newValue: number) => setTime(Math.min(newValue, maxTime)),
    setMaxTime,
    setTimeSecond,
    setMana: (newValue: number) => setMana(Math.min(newValue, maxMana)),
    setMaxMana,
    setManaSecond,
    setGold: (newValue: number) => setGold(Math.min(newValue, maxGold)),
    setMaxGold,
    setGoldSecond,
    setFood: (newValue: number) => setFood(Math.min(newValue, maxFood)),
    setMaxFood,
    setFoodSecond,
    setStone: (newValue: number) => setStone(Math.min(newValue, maxStone)),
    setMaxStone,
    setStoneSecond,
    setWood: (newValue: number) => setWood(Math.min(newValue, maxWood)),
    incrementWood: (incrementValue: number) => setWood(prevWood => Math.max(0,Math.min(prevWood + incrementValue, maxWood))),
    setMaxWood,
    setWoodSecond,
    setWarehouses: (newValue: number) => setWarehouses(newValue)
  };

  // Save state to Local Storage
  useEffect(() => {
    localStorage.setItem('resourcesState', JSON.stringify(values));
  }, [values]);

  return (
    <MyResourcesContext.Provider value={values}>
      <MyResourcesSettersContext.Provider value={setters}>
        {children}
      </MyResourcesSettersContext.Provider>
    </MyResourcesContext.Provider>
  );
};

export const useMyResourcesContext = (): MyResourcesContextType => {
  const context = useContext(MyResourcesContext);
  if (!context) {
    throw new Error('useMyResourcesContext must be used within a ResourcesProvider');
  }
  return context;
};

export const useMyResourcesSettersContext = (): MyResourcesSettersContextType => {
  const context = useContext(MyResourcesSettersContext);
  if (!context) {
    throw new Error('useMyResourcesSettersContext must be used within a ResourcesProvider');
  }
  return context;
};