import React, { useState } from 'react';
import { StatsProvider, useMyStatsContext } from '../../data/StatsContext';
import { useMyResourcesSettersContext, useMyResourcesContext } from '../../data/ResourcesContext';
import { useVisibilityContext, useVisibilitySettersContext } from '../../data/VisibilityContext';
import { useMyFollowersContext, useMyFollowersSettersContext } from '../../data/FollowersContext';
import { useBuildingCostContext, useBuildingCostSettersContext } from '../../data/BuildingCostContext';
import TownButton from '../../components/TownButton';
import './ExplorationMain.css';



export default function ExplorationMain(eventObject: any) {
  const { mana, maxMana, manaSecond, gold, maxGold, goldSecond, food, maxFood, foodSecond, stone, maxStone, stoneSecond, wood, maxWood, woodSecond } = useMyResourcesContext();
  const { setMana, setMaxMana, setManaSecond, setGold, setMaxGold, setGoldSecond, setFood, setMaxFood, setFoodSecond, setStone, setMaxStone, setStoneSecond, setWood, setMaxWood, setWoodSecond } = useMyResourcesSettersContext();
  const buildingCost = useBuildingCostContext();
  const buildingSetterCost = useBuildingCostSettersContext();
  const { divVisibility } = useVisibilityContext();
  const {  setVisibility, toggleVisibility} = useVisibilitySettersContext();
  const followers = useMyFollowersContext();
  const followersSetters = useMyFollowersSettersContext();

  return (
    <div className="exploration-main">

    </div>
  );
};