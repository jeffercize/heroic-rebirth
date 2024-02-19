import React, { useState } from 'react';
import { StatsProvider, useMyStatsContext } from '../data/StatsContext';
import { useMyResourcesSettersContext, useMyResourcesContext } from '../data/ResourcesContext';
import { useVisibilityContext, useVisibilitySettersContext } from '../data/VisibilityContext';
import { useMyFollowersContext, useMyFollowersSettersContext } from '../data/FollowersContext';
import { useBuildingCostContext, useBuildingCostSettersContext } from '../data/BuildingCostContext';
import TownButton from '../components/TownButton';
import './FollowersMain.css';



export default function FollowersMain(eventObject: any) {
  const { mana, maxMana, manaSecond, gold, maxGold, goldSecond, food, maxFood, foodSecond, stone, maxStone, stoneSecond, wood, maxWood, woodSecond } = useMyResourcesContext();
  const { setMana, setMaxMana, setManaSecond, setGold, setMaxGold, setGoldSecond, setFood, setMaxFood, setFoodSecond, setStone, setMaxStone, setStoneSecond, setWood, setMaxWood, setWoodSecond } = useMyResourcesSettersContext();
  const buildingCost = useBuildingCostContext();
  const buildingSetterCost = useBuildingCostSettersContext();
  const { divVisibility } = useVisibilityContext();
  const {  setVisibility, toggleVisibility} = useVisibilitySettersContext();
  const { freeFollowers, totalFollowers, lumberyard, maxLumberyard, stoneMine, maxStoneMine } = useMyFollowersContext();
  const { setFreeFollowers, setLumberyard, setStoneMine  } = useMyFollowersSettersContext();

  return (
    <div className="followers-main">
        <h2 className='followers-header'>
            Free Followers: {freeFollowers}/{totalFollowers}
        </h2>
        <div className="followers-row">
            <div className="followers-role">
                Lumberyard Workers:
            </div>
             <div className="followers-assigned">
                <span style={{paddingRight: 10, fontWeight: 'bold' }}>{lumberyard}/{maxLumberyard}</span>
                <button className="follower-add-button" disabled={wood < buildingCost.lumberyardWoodCost || stone < buildingCost.lumberyardStoneCost} onClick={() => {setLumberyard(lumberyard-1)}}>
                    -
                </button>
                <button className="follower-add-button" onClick={() => {setLumberyard(lumberyard+1)}}>
                    +
                </button>
             </div>
        </div>
        <div className="followers-row">
            <div className="followers-role">
                Stone Mine Workers:
            </div>
             <div className="followers-assigned">
                <span style={{paddingRight: 10, fontWeight: 'bold' }}>{stoneMine}/{maxStoneMine}</span>
                <button className="follower-add-button" onClick={() => setStoneMine(stoneMine-1)}>
                    -
                </button>
                <button className="follower-add-button"onClick={() => setStoneMine(stoneMine+1)}>
                    +
                </button>
             </div>
        </div>
    </div>
  );
};