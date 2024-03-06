import React, {useState, useEffect} from 'react';
import './SkillList.css';
import { StatsProvider, useMyStatsContext } from '../data/StatsContext';
import { useMyResourcesContext, useMyResourcesSettersContext } from '../data/ResourcesContext';
import { useVisibilitySettersContext, useVisibilityContext } from '../data/VisibilityContext';
import { useEventLogContext } from '../data/EventContext'; // adjust the path as needed
import EventCard from '../components/EventCard'; // adjust the path as needed




export default function SkillList(eventObject: any) {
    const { mana, maxMana, manaSecond, gold, maxGold, goldSecond, food, maxFood, foodSecond, stone, maxStone, stoneSecond, wood, maxWood, woodSecond } = useMyResourcesContext();
    const { setMana, setMaxMana, setManaSecond, setGold, setMaxGold, setGoldSecond, setFood, setMaxFood, setFoodSecond, setStone, setMaxStone, setStoneSecond, setWood, setMaxWood, setWoodSecond } = useMyResourcesSettersContext();    
    const stats = useMyStatsContext();
    const { divVisibility } = useVisibilityContext();
    const { setVisibility, toggleVisibility} = useVisibilitySettersContext();

    const chopTree = () => {
        setWood(wood+10);
        setMana(mana-10);
    };

    const mineRock = () => {
        setStone(stone+6);
        setMana(mana-15);
    }

    return (
        <div className="first-subsection">
            <h2 className="skill-list-title">Skill List</h2>
            <div className="skill-list-section">
                <div>
                    <div className={divVisibility.chopTree ? 'hidden' : 'horizontal-skill-group'}>
                        <button className="common-button common-small-button" disabled={mana < 10}onClick={() => chopTree()}>
                        <div className="small-button-text">
                            <span className="skill-name-text">Chop Tree</span>
                            <span className="mana-cost">
                                10 <img src="img/mana_icon.png" alt="mana-Icon"></img>
                            </span>
                        </div>
                        </button>
                        <button className="common-button collapse-small-button" onClick={() => toggleVisibility('chopTreeDescription')}>V</button>
                    </div>
                    <div className={divVisibility.chopTreeDescription ? 'hidden' : ''}>
                        <span style={{ verticalAlign: 'middle'}}>Chop down a tree using your heroic power</span> <span style={{ verticalAlign: 'middle', fontStyle: 'italic'}}></span> <span style={{ verticalAlign: 'middle', fontWeight: 'bold' }}>+{10}</span> <img src="img/wood_icon.png" alt="wood-Icon"  style={{ width: '22px', height: 'auto', verticalAlign: 'middle' }}></img>
                    </div>
                </div>
                <div>
                    <div className={divVisibility.mineRock ? 'hidden' : 'horizontal-skill-group'}>
                        <button className="common-button common-small-button" disabled={mana < 15}onClick={() => mineRock()}>
                        <div className="small-button-text">
                            <span className="skill-name-text">Mine Rock</span>
                            <span className="mana-cost">
                                15 <img src="img/mana_icon.png" alt="mana-Icon"></img>
                            </span>
                        </div>
                        </button>
                        <button className="common-button collapse-small-button" onClick={() => toggleVisibility('mineRockDescription')}>V</button>
                    </div>
                    <div className={divVisibility.mineRockDescription ? 'hidden' : ''}>
                                <span style={{ verticalAlign: 'middle'}}>Mine rocks using your heroic power</span> <span style={{ verticalAlign: 'middle', fontStyle: 'italic'}}></span> <span style={{ verticalAlign: 'middle', fontWeight: 'bold' }}>+{6}</span> <img src="img/stone_icon.png" alt="stone-Icon"  style={{ width: '22px', height: 'auto', verticalAlign: 'middle' }}></img>
                    </div>
                </div>
            </div>
        </div>
    );
};