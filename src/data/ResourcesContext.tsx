import React, { createContext, useContext, ReactNode, useEffect } from 'react';

interface MyResourcesContextType {
  time: number;
  setTime: (newValue: number) => void;
  maxTime: number;
  setMaxTime: (newValue: number) => void;
  timeSecond: number;
  setTimeSecond: (newValue: number) => void;
  mana: number;
  setMana: (newValue: number) => void;
  maxMana: number;
  setMaxMana: (newValue: number) => void;
  manaSecond: number;
  setManaSecond: (newValue: number) => void;
  gold: number;
  setGold: (newValue: number) => void;
  maxGold: number;
  setMaxGold: (newValue: number) => void;
  goldSecond: number;
  setGoldSecond: (newValue: number) => void;
  food: number;
  setFood: (newValue: number) => void;
  maxFood: number;
  setMaxFood: (newValue: number) => void;
  foodSecond: number;
  setFoodSecond: (newValue: number) => void;
  stone: number;
  setStone: (newValue: number) => void;
  maxStone: number;
  setMaxStone: (newValue: number) => void;
  stoneSecond: number;
  setStoneSecond: (newValue: number) => void;
  wood: number;
  setWood: (newValue: number) => void;
  maxWood: number;
  setMaxWood: (newValue: number) => void;
  woodSecond: number;
  setWoodSecond: (newValue: number) => void;
}

const MyResourcesContext = createContext<MyResourcesContextType | undefined>(undefined);

interface ResourcesProviderProps {
  children: ReactNode;
}

export const ResourcesProvider: React.FC<ResourcesProviderProps> = ({ children }) => {
  const useBoundedState = <T extends number>(
    initialValue: T,
    getMaxValue: () => number
  ): [T, (newValue: T) => void] => {
    const [value, setValue] = React.useState<T>(initialValue);
    
    const setValueWithMax = (newValue: T) => {
      setValue(Math.min(newValue, getMaxValue()) as T);
    };
  
    return [value, setValueWithMax];
  };

  const [maxTime, setMaxTime] = React.useState<number>(30000);
  const [time, setTime] = useBoundedState<number>(0, () => maxTime);
  const [timeSecond, setTimeSecond] = useBoundedState<number>(0, () => Infinity);

  const [maxMana, setMaxMana] = React.useState<number>(100);
  const [mana, setMana] = useBoundedState<number>(0, () => maxMana);
  const [manaSecond, setManaSecond] = useBoundedState<number>(0, () => Infinity);

  const [maxGold, setMaxGold] = React.useState<number>(100);
  const [gold, setGold] = useBoundedState<number>(0, () => maxGold);
  const [goldSecond, setGoldSecond] = useBoundedState<number>(0, () => Infinity);

  const [maxFood, setMaxFood] = React.useState<number>(200);
  const [food, setFood] = useBoundedState<number>(0, () => maxFood);
  const [foodSecond, setFoodSecond] = useBoundedState<number>(0, () => Infinity);

  const [maxStone, setMaxStone] = React.useState<number>(12);
  const [stone, setStone] = useBoundedState<number>(0, () => maxStone);
  const [stoneSecond, setStoneSecond] = useBoundedState<number>(0, () => Infinity);

  const [maxWood, setMaxWood] = React.useState<number>(64);
  const [wood, setWood] = useBoundedState<number>(0, () => maxWood);
  const [woodSecond, setWoodSecond] = useBoundedState<number>(0, () => Infinity);

  return (
    <MyResourcesContext.Provider value={{ 
      time, setTime, maxTime, setMaxTime, timeSecond, setTimeSecond,
      mana, setMana, maxMana, setMaxMana, manaSecond, setManaSecond,
      gold, setGold, maxGold, setMaxGold, goldSecond, setGoldSecond,
      food, setFood, maxFood, setMaxFood, foodSecond, setFoodSecond,
      stone, setStone, maxStone, setMaxStone, stoneSecond, setStoneSecond,
      wood, setWood, maxWood, setMaxWood, woodSecond, setWoodSecond,
    }}>
      {children}
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
