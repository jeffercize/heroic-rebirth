import React, { useState, useEffect } from 'react';
import { StatsProvider, useMyStatsContext } from '../../data/StatsContext';
import { useMyResourcesSettersContext, useMyResourcesContext } from '../../data/ResourcesContext';
import { useVisibilityContext, useVisibilitySettersContext } from '../../data/VisibilityContext';
import { useMyFollowersContext, useMyFollowersSettersContext } from '../../data/FollowersContext';
import { useBuildingCostContext, useBuildingCostSettersContext } from '../../data/BuildingCostContext';
import { useInventoryContext, useItemsContext, EquippedItems, Item } from '../../data/InventoryContext';
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
  const inventoryContext = useInventoryContext();
  const itemsContext = useItemsContext();

  const [popupItem, setPopupItem] = useState<{ item: Item | null, index: number | null }>({ item: null, index: null });
  const [selectedEquipment, setSelectedEquipment] = useState<{ item: Item | null, type: keyof EquippedItems | null }>({ item: null, type: null });
  const equipmentTypes: (keyof EquippedItems)[] = ['head', 'chest', 'legs', 'mainhand', 'trinket', 'offhand'];

  return (
    <div className="inventory-main-container">
      <div className="title-container">
        <div className="title-label">Equipment</div>
        <button className="crafting-button" onClick={() => inventoryContext.addItem(1)}>Crafting</button>
      </div>
      <div className="equipment-grid">
        {equipmentTypes.map((type) => {
          const equippedItemId = inventoryContext.equippedItems[type];
          const equippedItem = equippedItemId !== null ? itemsContext.items.find(item => item.id === equippedItemId) : null;
          return (
            <div key={type} className="equipment-item">
              <div className="equipment-type">{type}</div>
              <img 
                src={equippedItem ? `img/${equippedItem.imageName}.png` : `img/about_icon.png`} 
                className="equipment-image" 
                onClick={() => {
                  if (equippedItem) {
                    setSelectedEquipment({ item: equippedItem, type });
                  }
                }}  
              />
              
            </div>
          );
        })}
      </div>
      <hr className="inventory-line" />
      <div className="inventory-container">
        <div className="inventory-series">
          {Array(inventoryContext.inventoryMax).fill(0).map((_, index: number) => {
            const itemId = inventoryContext.inventory[index];
            const item = itemId !== undefined ? itemsContext.items.find(item => item.id === itemId) : null;
            return (
              <div key={index} className="inventory-slot">
              {item && (
                <img 
                  src={`img/${item.imageName}.png`} 
                  alt={item.imageName.replace('_icon', '')} 
                  className="inventory-image" 
                  onClick={() => setPopupItem({ item, index })}
                />
              )}
              </div>
            );
          })}
        </div>
      </div>
      {popupItem && popupItem.item && (
        <div className="popupoverlay">
          <div className="textbox">
            <img src={`img/${popupItem.item.imageName}.png`}/> {popupItem.item.name}: (ID: {popupItem.item.id})
            <p>{popupItem.item.description}</p> <p>Equipment Type: {popupItem.item.equipType}</p>
            <div style={{ textAlign: 'right' }}>
              <div style={{flexDirection: "row", display: "flex", justifyContent: "flex-end"}}>
                <button style={{marginRight: "10px"}} onClick={() => {
                  if (popupItem.item && popupItem.item.equipType && popupItem.index !== null) {
                    inventoryContext.equipItem(popupItem.item.equipType, popupItem.item.id);
                    inventoryContext.removeItem(popupItem.index);
                  }; 
                  setPopupItem({ item: null, index: null });
                }}>Equip</button>
                <button onClick={() => setPopupItem({ item: null, index: null })}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedEquipment && selectedEquipment.item && (
        <div className="popupoverlay">
          <div className="textbox">
            <img src={`img/${selectedEquipment.item.imageName}.png`}/> {selectedEquipment.item.id}
            <p>{selectedEquipment.item.equipType}</p>
            <div style={{ textAlign: 'right' }}>
              <div style={{flexDirection: "row", display: "flex", justifyContent: "flex-end"}}>
                <button style={{marginRight: "10px"}} onClick={() => {
                  if (selectedEquipment.type) {
                    inventoryContext.unequipItem(selectedEquipment.type);
                  }
                  setSelectedEquipment({ item: null, type: null });
                }}>Unequip</button>
                <button onClick={() => setSelectedEquipment({ item: null, type: null })}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}