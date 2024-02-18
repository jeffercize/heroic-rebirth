import React from 'react';
import { useMyStatsContext } from '../data/StatsContext';
import { useMyResourcesSettersContext, useMyResourcesContext } from '../data/ResourcesContext';
import { useVisibilityContext, useVisibilitySettersContext } from '../data/VisibilityContext';
import { useMyFollowersContext, useMyFollowersSettersContext } from '../data/FollowersContext';
import { useBuildingCostContext, useBuildingCostSettersContext } from '../data/BuildingCostContext';
import TownButton from '../components/TownButton';
import './CampusMain.css';

export default function CampusMain(eventObject: any) {
  const resources = useMyResourcesContext();
  const setters = useMyResourcesSettersContext();
  const buildingCost = useBuildingCostContext();
  const buildingSetterCost = useBuildingCostSettersContext();
  const { charisma, setCharisma } = useMyStatsContext();
  const { divVisibility } = useVisibilityContext();
  const { setVisibility, toggleVisibility } = useVisibilitySettersContext();
  const { freeFollowers, totalFollowers, maxFollowers, maxLumberyard, maxStoneMine } = useMyFollowersContext();
  const { setFreeFollowers, setTotalFollowers, setMaxFollowers, setMaxLumberyard, setMaxStoneMine } = useMyFollowersSettersContext();

  const manaPerClick = 5;

  const gatherManaEffect = (param: any) => {
    setters.setMana(resources.mana + manaPerClick);
  };

  const buildCabinEffect = (param: any) => {
    setMaxFollowers(maxFollowers + 1);
    setTotalFollowers(totalFollowers + 1);
    setFreeFollowers(freeFollowers + 1);
    setters.setWood(resources.wood - buildingCost.logCabinWoodCost);
    setters.setStone(resources.stone - buildingCost.logCabinStoneCost);
    buildingSetterCost.setLogCabinWoodCost(Math.floor(buildingCost.logCabinWoodCost + Math.pow(totalFollowers+1, 1.8)));
    buildingSetterCost.setLogCabinStoneCost(Math.floor(buildingCost.logCabinStoneCost + Math.pow(totalFollowers+1, 1.6)));
  };

  const buildLumberYardEffect = (param: any) => {
    setters.setWood(resources.wood - buildingCost.lumberyardWoodCost);
    setters.setStone(resources.stone - buildingCost.lumberyardStoneCost);
    setMaxLumberyard(maxLumberyard + 1);
    buildingSetterCost.setLumberyardWoodCost(Math.floor(buildingCost.lumberyardWoodCost + Math.pow(maxLumberyard, 1.8)));
    buildingSetterCost.setLumberyardStoneCost(Math.floor(buildingCost.lumberyardStoneCost + Math.pow(maxLumberyard, 1.6)));
  };

  const buildStoneMineEffect = (param: any) => {
    setters.setWood(resources.wood - buildingCost.stoneMineWoodCost);
    setters.setStone(resources.stone - buildingCost.stoneMineStoneCost);
    setMaxStoneMine(maxStoneMine + 1);
    buildingSetterCost.setStoneMineWoodCost(Math.floor(buildingCost.stoneMineWoodCost + Math.pow(maxStoneMine, 1.8)));
    buildingSetterCost.setStoneMineStoneCost(Math.floor(buildingCost.stoneMineStoneCost + Math.pow(maxStoneMine, 1.6)));
  };

  const buildWarehouseEffect = (param: any) => {
    setters.setMaxWood(resources.maxWood + 200);
    setters.setMaxStone(resources.maxStone + 150);
    setters.setWood(resources.wood - buildingCost.warehouseWoodCost);
    setters.setStone(resources.stone - buildingCost.warehouseStoneCost);
    setters.setWarehouses(resources.warehouses + 1);
    buildingSetterCost.setWarehouseWoodCost(Math.floor(buildingCost.warehouseWoodCost + Math.pow(resources.warehouses+1, 1.8)));
    buildingSetterCost.setWarehouseStoneCost(Math.floor(buildingCost.warehouseStoneCost + Math.pow(resources.warehouses+1, 1.6)));
  };

  return (
  <div className="second-subsection">
      <div className="button-group">
        <TownButton 
          buttonText = "Gather Energy"
          descriptionText = "Focus and gather your heroic energy." 
          tipText = "Tip: You CANT press and hold to auto-press!"
          incrementValue = {[manaPerClick]}
          perSecond = {false}
          maxIncrease = {false}
          imgSrc = {["img/mana_icon.png"]}
          visibilityKey={'gatherMana'}
          visibilityDescriptionKey={'gatherManaDescription'}
          onClickEffect = {gatherManaEffect}
          costs = {[]}/>
        <TownButton 
          buttonText = "Build Log Cabin"
          descriptionText = "Build a log cabin for living in." 
          tipText = "Tip: Maybe people will come to visit you!"
          incrementValue = {[1]}
          perSecond = {false}
          maxIncrease = {false}
          imgSrc = {["img/town_icon.png"]}
          visibilityKey={'buildLogCabin'}
          visibilityDescriptionKey={'buildLogCabinDescription'}
          onClickEffect = {buildCabinEffect}
          costs = {[
            { name: 'wood', cost: 'logCabinWoodCost', imgSrc: 'img/wood_icon.png' },
            { name: 'stone', cost: 'logCabinStoneCost', imgSrc: 'img/stone_icon.png' },
          ]}/>
        <TownButton 
          buttonText = "Build Lumber Yard"
          descriptionText = "Build a log yard for followers to work at." 
          tipText = "Tip: Make sure to assign workers!"
          incrementValue = {[1]}
          perSecond = {true}
          maxIncrease = {false}
          imgSrc = {["img/wood_icon.png"]}
          visibilityKey={'buildLumberYard'}
          visibilityDescriptionKey={'buildLumberYardDescription'}
          onClickEffect = {buildLumberYardEffect}
          costs = {[
            { name: 'wood', cost: 'lumberyardWoodCost', imgSrc: 'img/wood_icon.png' },
            { name: 'stone', cost: 'lumberyardStoneCost', imgSrc: 'img/stone_icon.png' },
          ]}/>
        <TownButton 
          buttonText = "Build Stone Mine"
          descriptionText = "Build a Stone Mine for followers to work at." 
          tipText = "Tip: Make sure to assign workers!"
          incrementValue = {[1]}
          perSecond = {true}
          maxIncrease = {false}
          imgSrc = {["img/stone_icon.png", "img/town_icon.png"]}
          visibilityKey={'buildStoneMine'}
          visibilityDescriptionKey={'buildStoneMineDescription'}
          onClickEffect = {buildStoneMineEffect}
          costs = {[
            { name: 'wood', cost: 'stoneMineWoodCost', imgSrc: 'img/wood_icon.png' },
            { name: 'stone', cost: 'stoneMineStoneCost', imgSrc: 'img/stone_icon.png' },
          ]}/>
        <TownButton 
          buttonText = "Build Warehouse"
          descriptionText = "Build a warhouse to store your stuff." 
          tipText = ""
          incrementValue = {[200, 150]}
          perSecond = {false}
          maxIncrease = {true}
          imgSrc = {["img/wood_icon.png", "img/stone_icon.png"]}
          visibilityKey={'buildWarehouse'}
          visibilityDescriptionKey={'buildWarehouseDescription'}
          onClickEffect = {buildWarehouseEffect}
          costs = {[
            { name: 'wood', cost: 'warehouseWoodCost', imgSrc: 'img/wood_icon.png' },
            { name: 'stone', cost: 'warehouseStoneCost', imgSrc: 'img/stone_icon.png' },
          ]}/>
      </div>
  </div>
  );
};