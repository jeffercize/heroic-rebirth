import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Item = {
  id: number;
  imageName: string;
  equipType: keyof EquippedItems | null;
};

export type EquippedItems = {
  head: number | null;
  chest: number | null;
  legs: number | null;
  mainhand: number | null;
  trinket: number | null;
  offhand: number | null;
};


interface InventoryContextType {
  inventory: number[];
  inventoryMax: number;
  addItem: (item: number) => void;
  removeItem: (item: number) => void;
  equipItem: (itemType: keyof EquippedItems, itemId: number) => void;
  unequipItem: (itemType: keyof EquippedItems) => void;
  equippedItems: EquippedItems;
}

interface ItemContextType {
  items: Item[];
}


const ItemContextType = createContext<ItemContextType | undefined>(undefined);
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

interface InventoryProviderProps {
  children: ReactNode;
}

const getInitialValue = (key: string, defaultValue: number[] = []) => {
  const savedState = JSON.parse(localStorage.getItem(key) || '[]');
  return savedState.length !== 0 ? savedState : defaultValue;
};

const getInitialInvMaxValue = (key: string, defaultValue: number = 8) => {
  const savedState = localStorage.getItem(key);
  return savedState !== null ? Number(savedState) : defaultValue;
};

const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  // Load state from Local Storage

  const [inventory, setInventory] = useState<number[]>(() => getInitialValue('inventory', []));
  const [inventoryMax, setInventoryMax] = useState<number>(() => getInitialInvMaxValue('inventoryMax', 8));
  const [items, setItems] = useState<Item[]>([]);

  const [equippedItems, setEquippedItems] = useState<EquippedItems>({
    head: null,
    chest: null,
    legs: null,
    mainhand: null,
    trinket: null,
    offhand: null,
  });

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/items.json')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error:', error));
  }, []);

  
  const addItem = (itemId: number) => {
    setInventory((prevInventory: number[]) => {
      if (items.find(item => item.id === itemId) && prevInventory.length >= inventoryMax) {
        // inventory is at max size, don't add item
        return prevInventory;
      } else {
        // inventory is not at max size, add item
        return [...prevInventory, itemId];
      }
    });
  };
  
  const removeItem = (index: number) => {
    setInventory((prevInventory: number[]) => {
      if (index >= 0 && index < prevInventory.length) {
        // index is valid, remove item
        const newInventory = [...prevInventory];
        newInventory.splice(index, 1);
        return newInventory;
      } else {
        // index is not valid, return the previous inventory
        return prevInventory;
      }
    });
  };

    
  const equipItem = (itemType: keyof EquippedItems, itemId: number) => {
    setEquippedItems(prevItems => {
      const currentlyEquippedItemId = prevItems[itemType];
      if (currentlyEquippedItemId !== null && inventory.length < inventoryMax) {
        // There's an item currently equipped and space in the inventory
        addItem(currentlyEquippedItemId);
      }
      return {
        ...prevItems,
        [itemType]: itemId,
      };
    });
  };

  const unequipItem = (itemType: keyof EquippedItems) => {
    if (inventory.length >= inventoryMax) {
      // Inventory is full, don't unequip
      return;
    }
    setEquippedItems(prevItems => {
      const unequippedItemId = prevItems[itemType];
      if (unequippedItemId !== null && inventory.length < inventoryMax) {
        // There's an item to unequip and space in the inventory
        addItem(unequippedItemId);
      }
      return {
        ...prevItems,
        [itemType]: null,
      };
    });
  };

  // Save state to Local Storage
  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  // Save state to Local Storage
  useEffect(() => {
    localStorage.setItem('inventoryMax', JSON.stringify(inventoryMax));
  }, [inventoryMax]);

  return (
    <ItemContextType.Provider value={{ items }}>
      <InventoryContext.Provider value={{ inventory, inventoryMax, equippedItems, addItem, removeItem, equipItem, unequipItem }}>
        {children}
      </InventoryContext.Provider>
    </ItemContextType.Provider>
  );
};

const useInventoryContext = (): InventoryContextType => {
  const inventoryContext = useContext(InventoryContext);
  if (!inventoryContext) {
    throw new Error('useInventoryContext must be used within an InventoryProvider');
  }
  return inventoryContext;
};

const useItemsContext = (): ItemContextType => {
  const itemContextType = useContext(ItemContextType);
  if (!itemContextType) {
    throw new Error('useItemContextType must be used within an InventoryProvider');
  }
  return itemContextType;
};

export { InventoryContext, InventoryProvider, useInventoryContext, useItemsContext };