import React from 'react';
import { useMyStatsContext, useMyStatsSettersContext } from '../../data/StatsContext';
import { useMyResourcesSettersContext, useMyResourcesContext } from '../../data/ResourcesContext';
import { useVisibilityContext, useVisibilitySettersContext } from '../../data/VisibilityContext';
import { useMyFollowersContext, useMyFollowersSettersContext } from '../../data/FollowersContext';
import { useBuildingCostContext, useBuildingCostSettersContext } from '../../data/BuildingCostContext';
import TownButton from '../../components/TownButton';
import './CampusMain.css';
import { stat } from 'fs';

export default function CampusMain(eventObject: any) {
  const resources = useMyResourcesContext();
  const resourceSetters = useMyResourcesSettersContext();
  const buildingCost = useBuildingCostContext();
  const buildingSetterCost = useBuildingCostSettersContext();
  const stats = useMyStatsContext();
  const statsSetters = useMyStatsSettersContext();
  const { divVisibility } = useVisibilityContext();
  const { setVisibility, toggleVisibility } = useVisibilitySettersContext();
  const { freeFollowers, totalFollowers, maxFollowers, lumberyard, maxLumberyard, stoneMine, maxStoneMine, lumberyardAutoAssign, stoneMineAutoAssign } = useMyFollowersContext();
  const { setFreeFollowers, setTotalFollowers, setMaxFollowers, setLumberyard, setMaxLumberyard, setStoneMine, setMaxStoneMine } = useMyFollowersSettersContext();
  
  const manaPerClick = 5;
  const woodPerClick = 0.1;

  const gatherWoodEffect = (param: any) => {
    resourceSetters.incrementWood(0.1 + stats.strength);
    statsSetters.setStrength(stats.strength + 0.001);
    statsSetters.incrementExperience(1);
    //resourceSetters.setMana(resources.mana - 1);
  };

  const buildCabinEffect = (param: any) => {
    setMaxFollowers(maxFollowers + 1);
    resourceSetters.setWood(resources.wood - buildingCost.logCabinWoodCost);
    resourceSetters.setStone(resources.stone - buildingCost.logCabinStoneCost);
    buildingSetterCost.setLogCabinCost(Math.pow(buildingCost.logCabinCost, 1.20));
    buildingSetterCost.setLogCabinWoodCost(Math.round(buildingCost.logCabinCost * buildingCost.logCabinWoodCostRatio));
    buildingSetterCost.setLogCabinStoneCost(Math.round(buildingCost.logCabinCost * buildingCost.logCabinStoneCostRatio));
  };

  const buildLumberYardEffect = (param: any) => {
    resourceSetters.setWood(resources.wood - buildingCost.lumberyardWoodCost);
    resourceSetters.setStone(resources.stone - buildingCost.lumberyardStoneCost);
    setMaxLumberyard(maxLumberyard + 1);
    buildingSetterCost.setLumberyardCost(Math.pow(buildingCost.lumberyardCost, 1.20));
    buildingSetterCost.setLumberyardWoodCost(Math.round(buildingCost.lumberyardCost * buildingCost.lumberyardWoodCostRatio));
    buildingSetterCost.setLumberyardStoneCost(Math.round(buildingCost.lumberyardCost * buildingCost.lumberyardStoneCostRatio));
    if (lumberyardAutoAssign && freeFollowers > 0){
      setFreeFollowers(freeFollowers - 1);
      setLumberyard(lumberyard + 1);
    }
  };

  const buildStoneMineEffect = (param: any) => {
    resourceSetters.setWood(resources.wood - buildingCost.stoneMineWoodCost);
    resourceSetters.setStone(resources.stone - buildingCost.stoneMineStoneCost);
    setMaxStoneMine(maxStoneMine + 1);
    buildingSetterCost.setStoneMineCost(Math.pow(buildingCost.stoneMineCost, 1.20));
    buildingSetterCost.setStoneMineWoodCost(Math.round(buildingCost.stoneMineCost * buildingCost.stoneMineWoodCostRatio));
    buildingSetterCost.setStoneMineStoneCost(Math.round(buildingCost.stoneMineCost * buildingCost.stoneMineStoneCostRatio));
    if (stoneMineAutoAssign && freeFollowers > 0){
      setFreeFollowers(freeFollowers - 1);
      setStoneMine(stoneMine + 1);
    }
  };

  const buildWarehouseEffect = (param: any) => {
    resourceSetters.setMaxWood(resources.maxWood + 200);
    resourceSetters.setMaxStone(resources.maxStone + 150);
    resourceSetters.setWood(resources.wood - buildingCost.warehouseWoodCost);
    resourceSetters.setStone(resources.stone - buildingCost.warehouseStoneCost);
    resourceSetters.setWarehouses(resources.warehouses + 1);
    buildingSetterCost.setWarehouseCost(Math.pow(buildingCost.warehouseCost, 1.20));
    buildingSetterCost.setWarehouseWoodCost(Math.round(buildingCost.warehouseCost * buildingCost.warehouseWoodCostRatio));
    buildingSetterCost.setWarehouseStoneCost(Math.round(buildingCost.warehouseCost * buildingCost.warehouseStoneCostRatio));
  };

  return (
  <div className="campus-section">
      <div className={divVisibility["gatherHeader"] ? 'hidden' : 'section-header'}>
        <span style={{ paddingTop: '31px', paddingBottom: "5px"}}>Gather</span> <button className="section-collapse-button" onClick={() => toggleVisibility("gatherGroup")}>V</button>
      </div>
      <button onClick={() => {
        localStorage.clear();
        window.location.reload();
      }}>Clear Local Storage and Refresh</button>
      <div className={divVisibility["gatherGroup"] ? 'hidden' : 'button-group'}>
        <TownButton 
          buttonText = "Chop Tree"
          descriptionText = "Chop a nearby tree for wood. " 
          tipText = "Tip: Strength increases how much wood you get per tap (Strength + 0.001)"
          incrementValue = {[stats.strength + 0.001]}
          perSecond = {false}
          maxIncrease = {false}
          incrementText = ""
          imgSrc = {["img/wood_icon.png"]}
          visibilityKey={'gatherWood'}
          visibilityDescriptionKey={'gatherWoodDescription'}
          onClickEffect = {gatherWoodEffect}
          costs = {[]}/>
      </div>
      <div className={divVisibility["housingHeader"] ? 'hidden' : 'section-header'}>
        <span style={{ paddingTop: '10px'}}>Housing</span> <button className="section-collapse-button" onClick={() => toggleVisibility("housingGroup")}>V</button>
      </div>
      <div className={divVisibility["housingGroup"] ? 'hidden' : 'button-group'}>
        <TownButton 
            buttonText = "Build Log Cabin"
            descriptionText = "Build a log cabin for living in." 
            tipText = "Tip: Maybe people will come to visit you!"
            incrementValue = {[1]}
            perSecond = {false}
            maxIncrease = {false}
            incrementText = "Max Followers"
            imgSrc = {["img/town_icon.png"]}
            visibilityKey={'buildLogCabin'}
            visibilityDescriptionKey={'buildLogCabinDescription'}
            onClickEffect = {buildCabinEffect}
            costs = {[
              { name: 'wood', cost: 'logCabinWoodCost', imgSrc: 'img/wood_icon.png' },
              { name: 'stone', cost: 'logCabinStoneCost', imgSrc: 'img/stone_icon.png' },
        ]}/>
      </div>
      <div className={divVisibility["buildingsHeader"] ? 'hidden' : 'section-header'}>
        <span style={{ paddingTop: '10px'}}>Buildings</span> <button className="section-collapse-button" onClick={() => toggleVisibility("buildingsGroup")}>V</button>
      </div>
      <div className={divVisibility["buildingsGroup"] ? 'hidden' : 'button-group'}>
        <TownButton 
            buttonText = "Build Lumber Yard"
            descriptionText = "Build a log yard for followers to work at." 
            tipText = "Tip: Make sure to assign workers!"
            incrementValue = {[1]}
            perSecond = {true}
            maxIncrease = {false}
            incrementText = "Max Workers"
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
            incrementText = "Max Workers"
            imgSrc = {["img/stone_icon.png", "img/town_icon.png"]}
            visibilityKey={'buildStoneMine'}
            visibilityDescriptionKey={'buildStoneMineDescription'}
            onClickEffect = {buildStoneMineEffect}
            costs = {[
              { name: 'wood', cost: 'stoneMineWoodCost', imgSrc: 'img/wood_icon.png' },
              { name: 'stone', cost: 'stoneMineStoneCost', imgSrc: 'img/stone_icon.png' },
          ]}/>
      </div>
      <div className={divVisibility["storageHeader"] ? 'hidden' : 'section-header'}>
        <span style={{ paddingTop: '10px'}}>Storage</span> <button className="section-collapse-button" onClick={() => toggleVisibility("storageGroup")}>V</button>
      </div>
      <div className={divVisibility["storageGroup"] ? 'hidden' : 'button-group'}>
        <TownButton 
          buttonText = "Build Warehouse"
          descriptionText = "Build a warhouse to store your stuff." 
          tipText = ""
          incrementValue = {[200, 150]}
          perSecond = {false}
          maxIncrease = {true}
          incrementText = ""
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