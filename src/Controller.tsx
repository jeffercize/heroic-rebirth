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
  //Event Type Stuff and Loading
  const savedState = JSON.parse(localStorage.getItem('state') || '{}');
  //UI Stuff
  const [woodDisplayChanged, setWoodDisplayChanged] = useState(savedState.woodDisplayChanged || false);
  const [stoneDisplayChanged, setStoneDisplayChanged] = useState(savedState.stoneDisplayChanged || false);
  //Skills
  const [chopTreeChanged, setChopTreeChanged] = useState(savedState.chopTreeChanged || false);
  const [mineRockChanged, setMineRockChanged] = useState(savedState.mineRockChanged || false);
  //Buildings
  const [buildLogCabinChanged, setBuildLogCabinChanged] = useState(savedState.buildLogCabinChanged || false);
  const [buildWarhouseChanged, setBuildWarhouseChanged] = useState(savedState.buildWarhouseChanged || false);
  const [buildLumberYardChanged, setBuildLumberYardChanged] = useState(savedState.buildLumberYardChanged || false);
  
  //save to local storage
  useEffect(() => {
    const values = {
      woodDisplayChanged,
      stoneDisplayChanged,
      chopTreeChanged,
      mineRockChanged,
      buildLogCabinChanged,
      buildWarhouseChanged,
      buildLumberYardChanged,
    };
    localStorage.setItem('state', JSON.stringify(values));
  }, [woodDisplayChanged, stoneDisplayChanged, chopTreeChanged, mineRockChanged, buildLogCabinChanged, buildWarhouseChanged, buildLumberYardChanged]);



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
  useEffect(() => { //DISABLED
    if (false && !chopTreeChanged && mana >= 10 ) {
        setVisibility('chopTree', false);
        setChopTreeChanged(true);
        addEvent({title: "Skills!", body: 'You have unlocked the Chop Tree skill!'});
    }
  }, [mana, chopTreeChanged]);

  useEffect(() => { //DISABLED
    if (false && !mineRockChanged && mana >= 10) {
        setVisibility('mineRock', false);
        setMineRockChanged(true);
        addEvent({title: "Rocking!", body: 'You have unlocked the Mine Rock skill!'});
    }
  }, [mana, mineRockChanged]);


  //Buildings
  useEffect(() => { //DISABLED
    if (false && stone > 0 && wood > 0 && !buildLogCabinChanged) {
        setVisibility('buildLogCabin', false);
        setBuildLogCabinChanged(true);
        addEvent({title: "Homebuilder!", body: 'You have unlocked the ability to build Log Cabins, you can start to build yourself a small settlement and make a home for your loyal followers to live!'});
    }
  }, [stone, wood, buildLogCabinChanged]);

  useEffect(() => { //DISABLED
    if (false && (stone == maxStone || wood == maxWood) && !buildWarhouseChanged) {
        setVisibility('buildWarehouse', false);
        setBuildWarhouseChanged(true);
        addEvent({title: "No More Storage", body: 'Sir, we have no more room to store our resources, and your followers refuse to just store things outside...'});

    }
  }, [stone, wood, buildWarhouseChanged]);

  useEffect(() => { //DISABLED
    if (false && totalFollowers > 5 && !buildLumberYardChanged) {
        setVisibility('buildLumberYard', false);
        setVisibility('buildStoneMine', false);
        setBuildLumberYardChanged(true);
        addEvent({title: "Getting to Work", body: 'Your followers wish to do more than just praise your greatness to help contribute to the settlement, they wish to work!'});
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
    setStoneSecond(stoneSecond + (difference * 0.5));
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
      setWood(Math.min(woodSecond * 0.1));
    }, 100); // update every 1/10 second
    return () => clearInterval(interval); // cleanup on unmount
  }, [manaSecond, maxMana, goldSecond, maxGold, foodSecond, maxFood, stoneSecond, maxStone, woodSecond, maxWood, setMana, setGold, setFood, setStone, setWood]);

  return (
    <div>
    </div>
  );
}

export default Controller;
