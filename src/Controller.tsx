import React, { useState, useEffect } from 'react';
import { StatsProvider, useMyStatsContext } from './data/StatsContext';
import { useMyResourcesSettersContext, useMyResourcesContext } from './data/ResourcesContext';
import { useVisibilitySettersContext, useVisibilityContext } from './data/VisibilityContext';
import { useEventLogContext } from './data/EventContext'; // adjust the path as needed



function Controller() {
  const { mana, maxMana, manaSecond, followers, maxFollowers, followersSecond, gold, maxGold, goldSecond, food, maxFood, foodSecond, stone, maxStone, stoneSecond, wood, maxWood, woodSecond } = useMyResourcesContext();
  const { setMana, setMaxMana, setManaSecond, setGold, setMaxGold, setGoldSecond, setFood, setMaxFood, setFoodSecond, setStone, setMaxStone, setStoneSecond, setWood, setMaxWood, setWoodSecond } = useMyResourcesSettersContext();  const { charisma, setCharisma } = useMyStatsContext();
  const { divVisibility } = useVisibilityContext();
  const { setVisibility, toggleVisibility } = useVisibilitySettersContext();
  const { addEvent } = useEventLogContext();

  const [chopTreeChanged, setChopTreeChanged] = useState(false);
  const [mineRockChanged, setMineRockChanged] = useState(false);
  const [woodDisplayChanged, setWoodDisplayChanged] = useState(false);
  const [stoneDisplayChanged, setStoneDisplayChanged] = useState(false);
  const [buildWarhouseChanged, setBuildWarhouseChanged] = useState(false);
  const [buildLogHouseChanged, setBuildLogHouseChanged] = useState(false);
  

  
  //Wood cutting + Stone cutting Skills Unlocked Event
  useEffect(() => {
    if (mana >= 10 && !chopTreeChanged) {
        setVisibility('chopTree', false);
        setChopTreeChanged(true);
        addEvent({title: "Skills!", body: 'You have unlocked the Chop Tree skill!'});
    }
  }, [mana, chopTreeChanged]);

  useEffect(() => {
    if (mana >= 10 && !mineRockChanged) {
        setVisibility('mineRock', false);
        setMineRockChanged(true);
        addEvent({title: "Rocking!", body: 'You have unlocked the Mine Rock skill!'});
    }
  }, [mana, mineRockChanged]);

  useEffect(() => {
    if (wood > 0 && !woodDisplayChanged) {
        setVisibility('woodResource', false);
        setWoodDisplayChanged(true);
    }
  }, [mana, woodDisplayChanged]);

  useEffect(() => {
    if (stone > 0 && !stoneDisplayChanged) {
        setVisibility('stoneResource', false);
        setStoneDisplayChanged(true);
    }
  }, [mana, stoneDisplayChanged]);

  useEffect(() => {
    if (stone > 0 && wood > 0 && !buildLogHouseChanged) {
        setVisibility('buildLogCabin', false);
        setBuildLogHouseChanged(true);
    }
  }, [mana, buildLogHouseChanged]);

  useEffect(() => {
    if (stone == maxStone || wood == maxWood && !buildWarhouseChanged) {
        setVisibility('buildWarehouse', false);
        setBuildWarhouseChanged(true);
    }
  }, [mana, buildWarhouseChanged]);

  useEffect(() => {
    if (followers > 0 && !buildWarhouseChanged) {
        setVisibility('buildLumberYard', false);
        setBuildWarhouseChanged(true);
    }
  }, [mana, buildWarhouseChanged]);


  useEffect(() => {
    const interval = setInterval(() => {
      setMana(Math.min(mana + manaSecond, maxMana));
      setGold(Math.min(gold + goldSecond, maxGold));
      setFood(Math.min(food + foodSecond, maxFood));
      setStone(Math.min(stone + stoneSecond, maxStone));
      setWood(Math.min(wood + woodSecond, maxWood));
    }, 1000); // update every second
  
    return () => clearInterval(interval); // cleanup on unmount
  }, [manaSecond, maxMana, goldSecond, maxGold, foodSecond, maxFood, stoneSecond, maxStone, woodSecond, maxWood, setMana, setGold, setFood, setStone, setWood]);

  return (
    <div>
    </div>
  );
}

export default Controller;
