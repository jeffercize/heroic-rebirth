import React, { useState, useEffect, useRef } from 'react';
import { StatsProvider, useMyStatsContext } from './data/StatsContext';
import { useMyResourcesSettersContext, useMyResourcesContext } from './data/ResourcesContext';
import { useVisibilitySettersContext, useVisibilityContext } from './data/VisibilityContext';
import { useMyFollowersContext, useMyFollowersSettersContext } from './data/FollowersContext';
import { useEventLogContext } from './data/EventContext'; // adjust the path as needed



function Controller() {
  const { mana, maxMana, manaSecond, gold, maxGold, goldSecond, food, maxFood, foodSecond, stone, maxStone, stoneSecond, wood, maxWood, woodSecond } = useMyResourcesContext();
  const { setMana, setMaxMana, setManaSecond, setGold, setMaxGold, setGoldSecond, setFood, setMaxFood, setFoodSecond, setStone, setMaxStone, setStoneSecond, setWood, setMaxWood, setWoodSecond } = useMyResourcesSettersContext();  const { charisma, setCharisma } = useMyStatsContext();
  const { divVisibility } = useVisibilityContext();
  const { setVisibility, toggleVisibility } = useVisibilitySettersContext();
  const { addEvent } = useEventLogContext();
  const { freeFollowers, totalFollowers, lumberyard, maxLumberyard, stoneMine, maxStoneMine } = useMyFollowersContext();
  const { setLumberyard, setStoneMine  } = useMyFollowersSettersContext();


  //Effect trackers
    //UI Stuff
    const [woodDisplayChanged, setWoodDisplayChanged] = useState(false);
    const [stoneDisplayChanged, setStoneDisplayChanged] = useState(false);

    //Event Type Stuff

    //Skills
    const [chopTreeChanged, setChopTreeChanged] = useState(false);
    const [mineRockChanged, setMineRockChanged] = useState(false);

    //Buildings
    const [buildLogCabinChanged, setBuildLogCabinChanged] = useState(false);
    const [buildWarhouseChanged, setBuildWarhouseChanged] = useState(false);
    const [buildLumberYardChanged, setBuildLumberYardChanged] = useState(false);
  



  //UI Stuff
  useEffect(() => {
    if (wood > 0 && !woodDisplayChanged) {
        setVisibility('woodResource', false);
        setWoodDisplayChanged(true);
    }
  }, [wood, woodDisplayChanged]);

  useEffect(() => {
    if (stone > 0 && !stoneDisplayChanged) {
        setVisibility('stoneResource', false);
        setStoneDisplayChanged(true);
    }
  }, [stone, stoneDisplayChanged]);

  
  //Event Type Stuff

  //Skills
  useEffect(() => {
    if (!chopTreeChanged && mana >= 10 ) {
        setVisibility('chopTree', false);
        setChopTreeChanged(true);
        addEvent({title: "Skills!", body: 'You have unlocked the Chop Tree skill!'});
    }
  }, [mana, chopTreeChanged]);

  useEffect(() => {
    if (!mineRockChanged && mana >= 10) {
        setVisibility('mineRock', false);
        setMineRockChanged(true);
        addEvent({title: "Rocking!", body: 'You have unlocked the Mine Rock skill!'});
    }
  }, [mana, mineRockChanged]);


  //Buildings
  useEffect(() => {
    if (stone > 0 && wood > 0 && !buildLogCabinChanged) {
        setVisibility('buildLogCabin', false);
        setBuildLogCabinChanged(true);
    }
  }, [stone, wood, buildLogCabinChanged]);

  useEffect(() => {
    if (stone == maxStone || wood == maxWood && !buildWarhouseChanged) {
        setVisibility('buildWarehouse', false);
        setBuildWarhouseChanged(true);
    }
  }, [stone, wood, buildWarhouseChanged]);

  useEffect(() => {
    if (totalFollowers > 0 && !buildLumberYardChanged) {
        setVisibility('buildLumberYard', false);
        setBuildLumberYardChanged(true);
    }
  }, [totalFollowers, buildLumberYardChanged]);

  useEffect(() => {
    if (totalFollowers > 0 && !buildLumberYardChanged) {
        setVisibility('buildStoneMine', false);
        setBuildLumberYardChanged(true);
    }
  }, [totalFollowers, buildLumberYardChanged]);

  //Non-Building Clickables


  //Per Second Updaters
  const prevLumberyardRef = useRef(lumberyard);
  useEffect(() => {
    const prevLumberyard = prevLumberyardRef.current;
    const difference = lumberyard - prevLumberyard;
    setWoodSecond(woodSecond + difference);
    prevLumberyardRef.current = lumberyard;
  }, [lumberyard]);
  

  const prevStoneMineRef = useRef(stoneMine);
  useEffect(() => {
    const prevStoneMine = prevStoneMineRef.current;
    const difference = stoneMine - prevStoneMine;
    setStoneSecond(stoneSecond + difference);
    prevStoneMineRef.current = stoneMine;
  }, [stoneMine]);

  const freeFollowersRef = useRef(freeFollowers);
  useEffect(() => {
    const freeFollowersPrev = freeFollowersRef.current;
    const difference = freeFollowers - freeFollowersPrev;
    setManaSecond(manaSecond + difference);
    freeFollowersRef.current = freeFollowers;
  }, [freeFollowers]);

  //Per Second effects
  useEffect(() => {
    const interval = setInterval(() => {
      setMana(Math.max(0,Math.min(mana + (manaSecond * 0.1), maxMana)));
      setGold(Math.max(0,Math.min(gold + (goldSecond * 0.1), maxGold)));
      setFood(Math.max(0,Math.min(food + (foodSecond * 0.1), maxFood)));
      setStone(Math.max(0,Math.min(stone + (stoneSecond * 0.1), maxStone)));
      setWood(Math.max(0,Math.min(wood + (woodSecond * 0.1), maxWood)));
    }, 100); // update every 1/10 second
    return () => clearInterval(interval); // cleanup on unmount
  }, [manaSecond, maxMana, goldSecond, maxGold, foodSecond, maxFood, stoneSecond, maxStone, woodSecond, maxWood, setMana, setGold, setFood, setStone, setWood]);

  return (
    <div>
    </div>
  );
}

export default Controller;
