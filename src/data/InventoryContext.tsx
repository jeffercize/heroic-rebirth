import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Item = {
  id: number;
  name: string;
  description: string;
  imageName: string;
  equipType: keyof EquippedItems | null;
  costs: {
    [resource: string]: number;
  };
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

interface CraftingContextType {
  craftableItems: Set<number>;
  lastCraftedItem: number;
  setLastCraftedItem: React.Dispatch<React.SetStateAction<number>>;
  setCraftableItems: React.Dispatch<React.SetStateAction<Set<number>>>;
}


const ItemContext = createContext<ItemContextType | undefined>(undefined);
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);
const CraftingContext = createContext<CraftingContextType | undefined>(undefined);

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

  const [equippedItems, setEquippedItems] = useState<EquippedItems>(() => {
    const savedState = localStorage.getItem('equippedItems');
    return savedState !== null ? JSON.parse(savedState) : {
      head: null,
      chest: null,
      legs: null,
      mainhand: null,
      trinket: null,
      offhand: null,
    };
  });
  
  const [craftableItems, setCraftableItems] = useState<Set<number>>(() => {
    const savedState = localStorage.getItem('craftableItems');
    if (savedState !== null) {
      const parsedState = JSON.parse(savedState);
      return Array.isArray(parsedState) ? new Set(parsedState) : new Set();
    } else {
      return new Set();
    }
  });
  const [lastCraftedItem, setLastCraftedItem] = useState<number>(() => getInitialInvMaxValue('lastCraftedItem', -1));

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

  useEffect(() => {
    localStorage.setItem('inventoryMax', JSON.stringify(inventoryMax));
  }, [inventoryMax]);

  useEffect(() => {
    localStorage.setItem('equippedItems', JSON.stringify(equippedItems));
  }, [equippedItems]);
  
  useEffect(() => {
    localStorage.setItem('craftableItems', JSON.stringify(Array.from(craftableItems)));
  }, [craftableItems]);

  useEffect(() => {
    localStorage.setItem('lastCraftedItem', JSON.stringify(lastCraftedItem));
  }, [lastCraftedItem]);

  return (
    <ItemContext.Provider value={{ items }}>
      <InventoryContext.Provider value={{ inventory, inventoryMax, equippedItems, addItem, removeItem, equipItem, unequipItem }}>
        <CraftingContext.Provider value={{ craftableItems, lastCraftedItem, setLastCraftedItem, setCraftableItems }}>
          {children}
        </CraftingContext.Provider>
      </InventoryContext.Provider>
    </ItemContext.Provider>
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
  const itemContextType = useContext(ItemContext);
  if (!itemContextType) {
    throw new Error('useItemContext must be used within an InventoryProvider');
  }
  return itemContextType;
};

const useCraftingContext = (): CraftingContextType => {
  const craftingContext = useContext(CraftingContext);
  if (!craftingContext) {
    throw new Error('useCraftingContext must be used within an InventoryProvider');
  }
  return craftingContext;
};

export { InventoryContext, InventoryProvider, useInventoryContext, useItemsContext, useCraftingContext };