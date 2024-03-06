import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {EventCardProps}  from '../components/EventCard';
import {ItemProp}  from '../components/ItemProp';

interface InventoryContextType {
  inventory: ItemProp[];
  addItem: (item: ItemProp) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

interface InventoryProviderProps {
  children: ReactNode;
}

const getInitialValue = (key: string, defaultValue: number) => {
  const savedState = JSON.parse(localStorage.getItem('inventoryState') || '{}');
  return savedState[key] !== undefined ? savedState[key] : defaultValue;
};

const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  // Load state from Local Storage

  const [inventory, setInventory] = useState<ItemProp[]>(() => getInitialValue('food', 0));

  
  const addItem = (item: ItemProp) => {
    setInventory(prevInv => [...prevInv, item]);
  };

  // Save state to Local Storage
  useEffect(() => {
    localStorage.setItem('inventoryState', JSON.stringify(inventory));
  }, [inventory]);

  return (
    <InventoryContext.Provider value={{ inventory, addItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

const useInventoryContext = (): InventoryContextType => {
  const inventoryContext = useContext(InventoryContext);
  if (!inventoryContext) {
    throw new Error('useInventoryContext must be used within an InventoryProvider');
  }
  return inventoryContext;
};

export { InventoryContext, InventoryProvider, useInventoryContext };