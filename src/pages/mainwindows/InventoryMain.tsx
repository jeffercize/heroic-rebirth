import React, { useState } from 'react';
import { StatsProvider, useMyStatsContext } from '../../data/StatsContext';
import { useMyResourcesSettersContext, useMyResourcesContext } from '../../data/ResourcesContext';
import { useVisibilityContext, useVisibilitySettersContext } from '../../data/VisibilityContext';
import { useMyFollowersContext, useMyFollowersSettersContext } from '../../data/FollowersContext';
import { useBuildingCostContext, useBuildingCostSettersContext } from '../../data/BuildingCostContext';
import TownButton from '../../components/TownButton';
import './InventoryMain.css';



export default function InventoryMain(eventObject: any) {
  const resources = useMyResourcesContext();
  const resourcesSetters = useMyResourcesSettersContext();
  const buildingCost = useBuildingCostContext();
  const buildingSetterCost = useBuildingCostSettersContext();
  const { divVisibility } = useVisibilityContext();
  const {  setVisibility, toggleVisibility} = useVisibilitySettersContext();
  const followers = useMyFollowersContext();
  const followersSetters = useMyFollowersSettersContext();

  const imageNames = ['strength', 'inventory', 'mana', 'wood', 'stone', 'gold', 'follower'];

  return (
    <div>
      <div className="inventory-container">
        <h1>Inventory</h1>
        <button className="crafting-button" >Crafting</button>
      </div>
      <div className="equipment-grid">
        {imageNames.slice(0, 6).map((imageName, index) => (
          <div key={index} className="equipment-item">
            <img src={`img/${imageName}_icon.png`} alt={imageName} className="equipment-image" />
            <button className="equipment-button">Unequip</button>
          </div>
        ))}
      </div>
      <hr className="inventory-line" />
      <div className="inventory-series">
        {imageNames.map((imageName, index) => (
          <img key={index} src={`img/${imageName}_icon.png`} alt={imageName} className="inventory-image" />
        ))}
      </div>
    </div>
  );
}