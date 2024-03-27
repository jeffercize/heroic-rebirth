import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface MyStatsContextType {
  strength: number;
  strengthSecond: number;
  experience: number;
  experienceSecond: number;
  experienceLevelUp: number;
  level: number;
  levelSecond: number;
}

export interface MyStatsSettersContextType {
  setStrength: React.Dispatch<React.SetStateAction<number>>;
  setStrengthSecond: React.Dispatch<React.SetStateAction<number>>;
  incrementExperience: (incrementValue: number) => void;
  setExperience: React.Dispatch<React.SetStateAction<number>>;
  setExperienceSecond: React.Dispatch<React.SetStateAction<number>>;
  setExperienceLevelUp: React.Dispatch<React.SetStateAction<number>>;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  incrementLevel: (incrementValue: number) => void;
  setLevelSecond: React.Dispatch<React.SetStateAction<number>>;

}

const MyStatsContext = createContext<MyStatsContextType | undefined>(undefined);
const MyStatsSettersContext = createContext<MyStatsSettersContextType | undefined>(undefined);


interface StatsProviderProps {
  children: ReactNode;
}

const getInitialValue = (key: string, defaultValue: number) => {
  const savedState = JSON.parse(localStorage.getItem('statsContext') || '{}');
  return savedState[key] !== undefined ? savedState[key] : defaultValue;
};

export const StatsProvider: React.FC<StatsProviderProps> = ({ children }) => {
  const [strength, setStrength] = useState<number>(() => getInitialValue('strength', 0));
  const [strengthSecond, setStrengthSecond] = useState<number>(() => getInitialValue('strengthSecond', 0));
  const [experience, setExperience] = useState<number>(() => getInitialValue('experience', 0));
  const [experienceSecond, setExperienceSecond] = useState<number>(() => getInitialValue('experienceSecond', 0));
  const [experienceLevelUp, setExperienceLevelUp] = useState<number>(() => getInitialValue('experienceLevelUp', 100));
  const [level, setLevel] = useState<number>(() => getInitialValue('level', 0));
  const [levelSecond, setLevelSecond] = useState<number>(() => getInitialValue('levelSecond', 0));
  const incrementLevel = (incrementValue: number) => setLevel(prevLevel => Math.max(0,prevLevel + incrementValue));
  const incrementExperience = (incrementValue: number) => setExperience(prevXP => Math.max(0,prevXP + incrementValue));
  

  const values = { strength, strengthSecond, experience, experienceSecond, experienceLevelUp, level, levelSecond};
  const setters = { setStrength, setStrengthSecond, setExperience, setExperienceSecond, setExperienceLevelUp, setLevel, incrementExperience, incrementLevel, setLevelSecond
  };


    // Save state to Local Storage
    useEffect(() => {
      localStorage.setItem('statsContext', JSON.stringify(values));
    }, [values]);

    useEffect(() => {
      if (experience >= experienceLevelUp) {
        incrementExperience(-1 * experienceLevelUp);
        incrementLevel(1);
        setExperienceLevelUp(Math.round(experienceLevelUp * 1.20)); //TODO make this a function of level
      }
    }, [experience, experienceLevelUp]);
  

  return (
    <MyStatsContext.Provider value={values}>
      <MyStatsSettersContext.Provider value={setters}>
        {children}      
      </MyStatsSettersContext.Provider>
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

export const useMyStatsSettersContext = (): MyStatsSettersContextType => {
  const context = useContext(MyStatsSettersContext);
  if (!context) {
    throw new Error('useMyStatsSettersContext must be used within a StatsProvider');
  }
  return context;
};