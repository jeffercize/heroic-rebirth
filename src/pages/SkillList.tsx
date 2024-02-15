import React, {useState} from 'react';
import './SkillList.css';
import { StatsProvider, useMyStatsContext } from '../data/StatsContext';
import { ResourcesProvider, useMyResourcesContext } from '../data/ResourcesContext';




export default function SkillList(eventObject: any) {
    const { mana, setMana, maxMana, setMaxMana, manaSecond, setManaSecond, gold, setGold, maxGold, setMaxGold, goldSecond, setGoldSecond, food, setFood, maxFood, setMaxFood, foodSecond, setFoodSecond, stone, setStone, maxStone, setMaxStone, stoneSecond, setStoneSecond, wood, setWood, maxWood, setMaxWood, woodSecond, setWoodSecond } = useMyResourcesContext();
    const { charisma, setCharisma } = useMyStatsContext();
    const [isHidden, setIsHidden] = useState(true);
    const [isGatherEnergyHidden, setisGatherEnergyHidden] = useState(true);

    const toggleVisibility = () => {
        setisGatherEnergyHidden(!isGatherEnergyHidden)
    }


    const chopTree = () => {
        setWood(wood+10);
        setMana(mana-10);
    };

    return (
        <div className="first-subsection">
            <h2 className="skill-list-title">Skill List</h2>
            <div className="horizontal-skill-group">
                <button className="common-button common-small-button" disabled={mana < 10}onClick={() => chopTree()}>
                Chop Tree
                </button>
                <button className="common-button collapse-small-button" onClick={toggleVisibility}>V</button>
            </div>
            <div className={isGatherEnergyHidden ? 'hidden' : ''}>
                <span style={{ verticalAlign: 'middle'}}>Chop down a tree using your heroic power</span> <span style={{ verticalAlign: 'middle', fontStyle: 'italic'}}></span> <span style={{ verticalAlign: 'middle', fontWeight: 'bold' }}>+{charisma}</span> <img src="img/wood_icon.png" alt="wood-Icon"  style={{ width: '22px', height: 'auto', verticalAlign: 'middle' }}></img>
            </div>
        </div>
    );
};