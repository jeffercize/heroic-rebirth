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
  //Story
  const [gameStartEvent, setGameStartEvent] = useState(savedState.gameStartEvent || false);
  //Crafting
  const [woodAxeCraftable, setWoodAxeCraftable] = useState(savedState.woodAxeCraftable || false);
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
      gameStartEvent,
      woodDisplayChanged,
      stoneDisplayChanged,
      chopTreeChanged,
      mineRockChanged,
      buildLogCabinChanged,
      buildWarhouseChanged,
      buildLumberYardChanged,
    };
    localStorage.setItem('state', JSON.stringify(values));
  }, [gameStartEvent, woodDisplayChanged, stoneDisplayChanged, chopTreeChanged, mineRockChanged, buildLogCabinChanged, buildWarhouseChanged, buildLumberYardChanged]);

  //Single Event checker that is a direct ref so it wont get double called on render, other events should be fine without this
  //could also add a feature in the eventlog that checks for the same event happening one after another, 
  //which should be unlikely/impossible in normal gameplay so we would disallow it programaticly
  const hasGameStartEvent = useRef(false);
  const hasWoodAxeCraftable = useRef(false);

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

  //Story
  useEffect(() => {
    if (!hasGameStartEvent.current && !gameStartEvent) {
        console.log('useEffect is running');
        setVisibility('gatherWood', false);
        setGameStartEvent(true);
        hasGameStartEvent.current = true;
        addEvent({title: "A New World!", body: 'You have been summoned to a magical new world by the king of the land along with a handful of other people as the heroes, destined to save the world from evil! But something seems off...', displayed:false});
        addEvent({title: "The weakest of the weak", body: 'The heroes all have their potenial power assested by a large glass orb and are everybody is amazed by the potential of the heroes as the orb glows brilliantly, they are all SS rank or stronger but when it comes time for your test the orb turns a dull grey... you are an E rank, the weakest possible...', displayed:false});
        addEvent({title: "Exiled", body: 'The king exiles you deeming you a bad omen and exiles you from his kingdom. But you are determined to show them that you will be the greatest of heroes!', displayed:false});
        addEvent({title: "Beginnings", body: 'The king\'s men leave you in a vast forest, you figure it would be a good idea to gather some wood to make a shelter.', displayed:false});
    }
  }, []);

  //Crafting
  useEffect(() => {
    if (!hasWoodAxeCraftable.current && wood >= 10) {
        setWoodAxeCraftable(true);
        hasWoodAxeCraftable.current = true;
        setVisibility('craftWoodenAxe', false);
    }
  }, [wood]);

  //Skills
  useEffect(() => { //DISABLED
    if (false && !chopTreeChanged && mana >= 10 ) {
        setVisibility('chopTree', false);
        setChopTreeChanged(true);
        //addEvent({title: "Skills!", body: 'You have unlocked the Chop Tree skill!'});
    }
  }, [mana]);

  useEffect(() => { //DISABLED
    if (false && !mineRockChanged && mana >= 10) {
        setVisibility('mineRock', false);
        setMineRockChanged(true);
        //addEvent({title: "Rocking!", body: 'You have unlocked the Mine Rock skill!'});
    }
  }, [mana, mineRockChanged]);


  //Buildings
  useEffect(() => { //DISABLED
    if (false && stone > 0 && wood > 0 && !buildLogCabinChanged) {
        setVisibility('buildLogCabin', false);
        setBuildLogCabinChanged(true);
        //addEvent({title: "Homebuilder!", body: 'You have unlocked the ability to build Log Cabins, you can start to build yourself a small settlement and make a home for your loyal followers to live!'});
    }
  }, [stone, wood, buildLogCabinChanged]);

  useEffect(() => { //DISABLED
    if (false && (stone == maxStone || wood == maxWood) && !buildWarhouseChanged) {
        setVisibility('buildWarehouse', false);
        setBuildWarhouseChanged(true);
        //addEvent({title: "No More Storage", body: 'Sir, we have no more room to store our resources, and your followers refuse to just store things outside...'});

    }
  }, [stone, wood, buildWarhouseChanged]);

  useEffect(() => { //DISABLED
    if (false && totalFollowers > 5 && !buildLumberYardChanged) {
        setVisibility('buildLumberYard', false);
        setVisibility('buildStoneMine', false);
        setBuildLumberYardChanged(true);
        //addEvent({title: "Getting to Work", body: 'Your followers wish to do more than just praise your greatness to help contribute to the settlement, they wish to work!'});
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
