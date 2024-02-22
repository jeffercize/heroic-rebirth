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
  const followers = useMyFollowersContext();
  const followersSetters = useMyFollowersSettersContext();
  
  const handleAutoAssignChange = (event: React.ChangeEvent<HTMLInputElement>, setterName: string) => {
    // prepend 'set' to the setterName
    const setterFuncName = 'set' + setterName.charAt(0).toUpperCase() + setterName.slice(1);
    if (setterFuncName in followersSetters) {
      const currentValue = followers[setterName as keyof typeof followers];
      followersSetters[setterFuncName as keyof typeof followersSetters](currentValue === 1 ? 0 : 1);
    } else {
      console.error(`Unknown setter name: ${setterFuncName}`);
    }
  };

  return (
    <div className="followers-main">
        <h2 className='followers-header'>
            Worshiping Followers: {followers.freeFollowers}/{followers.totalFollowers}
        </h2>
        <div className="followers-row">
            <div className="followers-role">
                Lumberyard Workers: 1
                <img src="img/wood_icon.png" alt=" wood"  style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}/>
                /s per worker = {followers.lumberyard}<img src="img/wood_icon.png" alt=" wood"  style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}/>/s Total
            </div>
             <div className="followers-assigned">
                <span style={{paddingRight: 20, fontWeight: 'bold' }}>Auto-Assign:<input type="checkbox" id="lumberyardCheckbox" checked={Number(followers.lumberyardAutoAssign) === 1} onChange={(event) => handleAutoAssignChange(event, 'lumberyardAutoAssign')}></input></span>
                <span style={{paddingRight: 10, fontWeight: 'bold' }}>{followers.lumberyard}/{followers.maxLumberyard}</span>
                <button className="follower-add-button" disabled = {followers.lumberyard <= 0} onClick={() => {followersSetters.setLumberyard(followers.lumberyard-1); followersSetters.setFreeFollowers(followers.freeFollowers+1)}}>
                    -
                </button>
                <button className="follower-add-button" disabled = {followers.freeFollowers <= 0 || followers.lumberyard >= followers.maxLumberyard} onClick={() => {followersSetters.setLumberyard(followers.lumberyard+1); followersSetters.setFreeFollowers(followers.freeFollowers-1)}}>
                    +
                </button>
             </div>
        </div>
        <div className="followers-row">
            <div className="followers-role">
                Stone Mine Workers: 1
                <img src="img/stone_icon.png" alt=" stone"  style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}/>
                /s per worker = {followers.stoneMine}<img src="img/stone_icon.png" alt=" stone"  style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}/>/s Total
            </div>
             <div className="followers-assigned">
                <span style={{paddingRight: 20, fontWeight: 'bold' }}>Auto-Assign:<input type="checkbox" id="stoneMineCheckbox" checked={Number(followers.stoneMineAutoAssign) === 1} onChange={(event) => handleAutoAssignChange(event, 'stoneMineAutoAssign')}></input></span>
                <span style={{paddingRight: 10, fontWeight: 'bold' }}>{followers.stoneMine}/{followers.maxStoneMine}</span>
                <button className="follower-add-button" disabled = {followers.stoneMine <= 0} onClick={() => {followersSetters.setStoneMine(followers.stoneMine-1); followersSetters.setFreeFollowers(followers.freeFollowers+1)}}>
                    -
                </button>
                <button className="follower-add-button" disabled = {followers.freeFollowers <= 0 || followers.stoneMine >= followers.maxStoneMine} onClick={() => {followersSetters.setStoneMine(followers.stoneMine+1); followersSetters.setFreeFollowers(followers.freeFollowers-1)}}>
                    +
                </button>
             </div>
        </div>
    </div>
  );
};