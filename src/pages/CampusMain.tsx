import React, { useState } from 'react';
import { StatsProvider, useMyStatsContext } from '../data/StatsContext';
import { ResourcesProvider, useMyResourcesContext } from '../data/ResourcesContext';




export default function CampusMain(eventObject: any) {
  const { time, setTime, maxTime, setMaxTime, timeSecond, setTimeSecond, mana, setMana, maxMana, setMaxMana, manaSecond, setManaSecond, gold, setGold, maxGold, setMaxGold, goldSecond, setGoldSecond, food, setFood, maxFood, setMaxFood, foodSecond, setFoodSecond, stone, setStone, maxStone, setMaxStone, stoneSecond, setStoneSecond, wood, setWood, maxWood, setMaxWood, woodSecond, setWoodSecond } = useMyResourcesContext();
  const { charisma, setCharisma } = useMyStatsContext();

    const [isHidden, setIsHidden] = useState(true);

    const toggleVisibility = () => {
      setIsHidden(!isHidden)
    }

    return (
    <div className="second-subsection">
        <div className="button-group">
          <div className="horizontal-group">
            <button className="common-button gather-gold-button" onClick={() => setMana(mana+1)}>
              Gather Energy
            </button>
            <button className="common-button collapse-button" onClick={toggleVisibility}>V</button>
          </div>
          <div className={isHidden ? 'hidden' : ''}>
              <span style={{ verticalAlign: 'middle'}}>Focus and gather your heroic energy</span> <span style={{ verticalAlign: 'middle', fontStyle: 'italic'}}>Tip:You CANT press and hold to auto-press!</span> <span style={{ verticalAlign: 'middle', fontWeight: 'bold' }}>+{1}</span> <img src="img/mana_icon.png" alt="mana-Icon"  style={{ width: '22px', height: 'auto', verticalAlign: 'middle' }}></img>
          </div>
          <button className="hidden common-button buy-coin-pouch" onClick={() => setMaxMana(maxMana + 25)}>
            Buy Coin Pouch
          </button>
        </div>
    </div>
    );
};