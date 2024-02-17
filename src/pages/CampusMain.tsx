import React, { useState } from 'react';
import { StatsProvider, useMyStatsContext } from '../data/StatsContext';
import { useMyResourcesSettersContext, useMyResourcesContext } from '../data/ResourcesContext';
import { useVisibilityContext, useVisibilitySettersContext } from '../data/VisibilityContext';
import TownButton from '../components/TownButton';
import './CampusMain.css';



export default function CampusMain(eventObject: any) {
  const { mana, maxMana, manaSecond, gold, maxGold, goldSecond, food, maxFood, foodSecond, stone, maxStone, stoneSecond, wood, maxWood, woodSecond } = useMyResourcesContext();
  const { setMana, setMaxMana, setManaSecond, setGold, setMaxGold, setGoldSecond, setFood, setMaxFood, setFoodSecond, setStone, setMaxStone, setStoneSecond, setWood, setMaxWood, setWoodSecond } = useMyResourcesSettersContext();
  const { charisma, setCharisma } = useMyStatsContext();
  const { divVisibility } = useVisibilityContext();
  const {  setVisibility, toggleVisibility} = useVisibilitySettersContext();


  const gatherManaEffect = (param: any) => {
    setMana(mana+1);
  };

  const buildCabinEffect = (param: any) => {
    setMana(mana+1);
  };

  const buildLumberYardEffect = (param: any) => {
    setMana(mana+1);
  };

  const buildWarehouseEffect = (param: any) => {
    setMana(mana+1);
  };

const costs = [
  { name: 'Wood', value: 10, maxValue: 100, imgSrc: 'img/wood_icon.png' },
  { name: 'Stone', value: 20, maxValue: 200, imgSrc: 'img/stone_icon.png' },
];

  return (
  <div className="second-subsection">
      <div className="button-group">
        <TownButton 
          buttonText = "Gather Energy"
          descriptionText = "Focus and gather your heroic energy." 
          tipText = "Tip: You CANT press and hold to auto-press!"
          incrementValue = {1}
          perSecond = {false}
          maxIncrease = {false}
          imgSrc = "img/mana_icon.png"
          visibilityKey={'gatherMana'}
          visibilityDescriptionKey={'gatherManaDescription'}
          onClickEffect = {gatherManaEffect}
          costs = {[]}/>
        <TownButton 
          buttonText = "Build Log Cabin"
          descriptionText = "Build a log cabin for living in." 
          tipText = "Tip: Maybe people will come to visit you!"
          incrementValue = {1}
          perSecond = {false}
          maxIncrease = {false}
          imgSrc = "img/town_icon.png"
          visibilityKey={'buildLogCabin'}
          visibilityDescriptionKey={'buildLogCabinDescription'}
          onClickEffect = {buildCabinEffect}
          costs = {[
            { name: 'wood', cost: 25, imgSrc: 'img/wood_icon.png' },
            { name: 'stone', cost: 5, imgSrc: 'img/stone_icon.png' },
          ]}/>
        <TownButton 
          buttonText = "Build Lumber Yard"
          descriptionText = "Build a log yard for followers to work at." 
          tipText = "Tip: Make sure to assign workers!"
          incrementValue = {1}
          perSecond = {true}
          maxIncrease = {false}
          imgSrc = "img/town_icon.png"
          visibilityKey={'buildLumberYard'}
          visibilityDescriptionKey={'buildLumberYardDescription'}
          onClickEffect = {buildLumberYardEffect}
          costs = {[
            { name: 'wood', cost: 25, imgSrc: 'img/wood_icon.png' },
            { name: 'stone', cost: 5, imgSrc: 'img/stone_icon.png' },
          ]}/>
        <TownButton 
          buttonText = "Build Warehouse"
          descriptionText = "Build a warhouse to store your stuff." 
          tipText = ""
          incrementValue = {400}
          perSecond = {false}
          maxIncrease = {true}
          imgSrc = "img/stone_icon.png"
          visibilityKey={'buildWarehouse'}
          visibilityDescriptionKey={'buildWarehouseDescription'}
          onClickEffect = {buildWarehouseEffect}
          costs = {[
            { name: 'wood', cost: 25, imgSrc: 'img/wood_icon.png' },
            { name: 'stone', cost: 5, imgSrc: 'img/stone_icon.png' },
          ]}/>
      </div>
  </div>
  );
};