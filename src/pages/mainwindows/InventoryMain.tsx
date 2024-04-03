import React, { useState, useEffect, useRef } from 'react';
import { StatsProvider, useMyStatsContext } from '../../data/StatsContext';
import { useMyResourcesSettersContext, useMyResourcesContext } from '../../data/ResourcesContext';
import { useVisibilityContext, useVisibilitySettersContext } from '../../data/VisibilityContext';
import { useMyFollowersContext, useMyFollowersSettersContext } from '../../data/FollowersContext';
import { useBuildingCostContext, useBuildingCostSettersContext } from '../../data/BuildingCostContext';
import { useInventoryContext, useItemsContext, EquippedItems, Item, useCraftingContext } from '../../data/InventoryContext';
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
  const craftableContext = useCraftingContext();

  const [popupItem, setPopupItem] = useState<{ item: Item | null, index: number | null }>({ item: null, index: null });
  const [selectedEquipment, setSelectedEquipment] = useState<{ item: Item | null, type: keyof EquippedItems | null }>({ item: null, type: null });
  const [craftingWindow, setCraftingWindow] = useState<boolean>(false);
  const [craftingPopupItem, setCraftingPopupItem] = useState<{ item: Item | null, index: number | null }>({ item: null, index: null });
  const equipmentTypes: (keyof EquippedItems)[] = ['head', 'chest', 'legs', 'mainhand', 'trinket', 'offhand'];

  const textBoxRef = useRef<HTMLDivElement>(null);
  const textBoxRef2 = useRef<HTMLDivElement>(null);

  const [canCraft, setCanCraft] = useState<boolean>(false);

  useEffect(() => {
    if (craftingPopupItem.item) {
      const canCraft = Object.entries(craftingPopupItem.item.costs).every(([resource, cost]) => resources[resource as keyof typeof resources] >= cost);
      setCanCraft(canCraft);
    } else {
      setCanCraft(false);
    }
  }, [craftingPopupItem, resources]);

  function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toPrecision(3) + 'M';
    } else if (num >= 10000) {
        return (num / 1000).toPrecision(3) + 'K';
    } else if (num >= 10) {
        return num.toPrecision(4);
    } else if (num >= 1) {
        return num.toPrecision(3);
    } else if (num >= 0.1){
        return num.toPrecision(3);
    } else if (num >= 0.01){
        return num.toPrecision(2);
    } else {
        return num.toPrecision(1);
    }
  }

  
  const closePopup = () => {
    setPopupItem({ item: null, index: null })
    setSelectedEquipment({ item: null, type: null });
    setCraftingWindow(false);
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (textBoxRef.current && !textBoxRef.current.contains(event.target as Node)) {
      closePopup();
    }
  };

  const handleClickOutside2 = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (textBoxRef2.current && !textBoxRef2.current.contains(event.target as Node)) {
      setCraftingPopupItem({ item: null, index: null });
    }
  };

  return (
    <div className="inventory-main-container">
      <div className="title-container">
        <div className="title-label">Equipment</div>
        <button className="crafting-button" onClick={() => setCraftingWindow(true)}>Crafting</button>
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
        <div className="popupoverlay" onClick={handleClickOutside}>
          <div className="textbox" ref={textBoxRef}>
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
        <div className="popupoverlay" onClick={handleClickOutside}>
          <div className="textbox" ref={textBoxRef}>
            <img src={`img/${selectedEquipment.item.imageName}.png`}/> {selectedEquipment.item.name}: (ID: {selectedEquipment.item.id})
            <p>{selectedEquipment.item.description}</p> <p>Equipment Type: {selectedEquipment.item.equipType}</p>
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
      {craftingWindow && (
        <div className="popupoverlay" onClick={handleClickOutside}>
          <div className="craftingbox" ref={textBoxRef}>
            <div className="inventory-container">
            <div className="inventory-series">
              {itemsContext.items
              .filter(item => craftableContext.craftableItems.has(item.id))
              .map((item, index) => {
                return (
                  <div key={index} className="inventory-slot">
                    <img 
                      src={`img/${item.imageName}.png`} 
                      alt={item.imageName.replace('_icon', '')} 
                      className="inventory-image" 
                      onClick={() => setCraftingPopupItem({ item, index })}
                    />
                  </div>
                );
              })}
            </div>
            </div>
            <button onClick={() => setCraftingWindow(false)}>Close</button>
          </div>
        </div>
      )}
      {craftingPopupItem && craftingPopupItem.item && (
        <div className="popupoverlay" onClick={handleClickOutside2}>
          <div className="textbox" ref={textBoxRef2}>
            <img src={`img/${craftingPopupItem.item.imageName}.png`}/> {craftingPopupItem.item.name}: (ID: {craftingPopupItem.item.id})
            <p>{craftingPopupItem.item.description}</p> <p>Equipment Type: {craftingPopupItem.item.equipType}</p>
            <div className="popupcrafting_costrow">
              <div className="popupcrafting_costtitle">Costs:</div>
              {Object.entries(craftingPopupItem.item.costs).map(([resource, cost], index) => (
              <div key={index} className="singlecost_row">
                <div className='singlecost_name'>
                  <img src={`img/${resource}_icon.png`}/>{resource}:
                </div> 
                <div className='singlecost_value'> 
                  <span className={resources[resource as keyof typeof resources] < cost ? 'red-text' : ''}>
                    {formatNumber(resources[resource as keyof typeof resources])}
                  </span>
                  /{cost} 
                </div>
              </div>
              ))}
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{flexDirection: "row", display: "flex", justifyContent: "flex-end"}}>
                <button style={{marginRight: "10px"}} disabled={!canCraft} onClick={() => {
                  if (craftingPopupItem.item) {
                    craftableContext.setLastCraftedItem(1);
                    inventoryContext.addItem(1);
                    resourcesSetters.deductResources(craftingPopupItem.item.costs);
                  }; 
                }}>Craft</button>
                <button onClick={() => setCraftingPopupItem({ item: null, index: null })}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}