import React, {useState} from 'react';
import './SideBarLeft.css';
import { StatsProvider, useMyStatsContext } from '../data/StatsContext';
import { useMyResourcesSettersContext, useMyResourcesContext } from '../data/ResourcesContext';
import { useVisibilityContext, useVisibilitySettersContext } from '../data/VisibilityContext';
import { MainComponentType } from '../App';


type SideBarLeftProps = {
    changeMainComponent: (componentName: MainComponentType) => void;
  };

export default function SideBarLeft( {changeMainComponent}: SideBarLeftProps) {
    const { mana, maxMana, manaSecond, gold, maxGold, goldSecond, food, maxFood, foodSecond, stone, maxStone, stoneSecond, wood, maxWood, woodSecond, time, maxTime, timeSecond } = useMyResourcesContext();
    const { setMana, setMaxMana, setManaSecond, setGold, setMaxGold, setGoldSecond, setFood, setMaxFood, setFoodSecond, setStone, setMaxStone, setStoneSecond, setWood, setMaxWood, setWoodSecond } = useMyResourcesSettersContext();    const { charisma, setCharisma } = useMyStatsContext();
    const { divVisibility } = useVisibilityContext();
    const { setVisibility, toggleVisibility} = useVisibilitySettersContext();
    return (
        <div className="first-subsection">
            <h2 className="">Heroic Rebirth</h2>
            <div className="town-button common-compound-button" role="button" onClick={() => changeMainComponent('CampusMain')}>
                <img src="img/town_icon.png" alt="town-Icon"></img>
                <label className="common-button-label">Town</label>
            </div>
            <div className="common-compound-button" role="button" onClick={() => changeMainComponent('FollowersMain')}>
                <img src="img/follower_icon.png" alt="follower-Icon"></img>
                <label className="common-button-label">Followers</label>
            </div>
            <div className="common-compound-button" role="button" onClick={() => changeMainComponent('StatsComponent')}>
                <img src="img/stats_icon.png" alt="stats-Icon"></img>
                <label className="common-button-label">Help</label>
            </div>
            <div className="common-compound-button" role="button" onClick={() => changeMainComponent('HelpComponent')}>
                <img src="img/help_icon.png" alt="help-Icon"></img>
                <label className="common-button-label">Help</label>
            </div>
            <div className="common-compound-button" role="button" onClick={() => changeMainComponent('OptionsComponent')}>
                <img src="img/options_icon.png" alt="options-Icon"></img>
                <label className="common-button-label">Options</label>
            </div>
            <div className="common-compound-button" role="button" onClick={() => changeMainComponent('AboutComponent')}>
                <img src="img/about_icon.png" alt="about-Icon"></img>
                <label className="common-button-label">About</label>
            </div>
            <div className="section-compound-button" role="button" onClick={() => toggleVisibility('resources')}>
                <label className="section-label">
                Resources
                </label>
                <button className="common-button side-bar-button">V</button>
            </div>
            <div className={divVisibility.resources ? 'hidden resource-section' : 'resource-section'}>
                <div className={divVisibility.manaResouce ? 'hidden' : 'resource-row'}>
                    <div className="resource-name">
                        <img src="img/mana_icon.png" alt="mana-Icon"  style={{ width: '22px', height: 'auto', verticalAlign: 'middle' }}></img>Energy:
                    </div>
                    <div className="resource-numbers">
                        <div className={mana == maxMana ? "blue-text resource-capacity" : "resource-capacity"}>
                            {Math.floor(mana)}/{Math.floor(maxMana)}
                        </div>
                        <div className="resource-rate">
                            +{Math.floor(manaSecond)}/s
                        </div>
                    </div>
                </div>
                <div className={divVisibility.woodResource ? 'hidden' : 'resource-row'}>
                    <div className="resource-name">
                        <img src="img/wood_icon.png" alt="wood-Icon"  style={{ width: '22px', height: 'auto', verticalAlign: 'middle' }}></img>Wood:
                    </div>
                    <div className="resource-numbers">
                        <div className={wood == maxWood ? "blue-text resource-capacity" : "resource-capacity"}>
                        {Math.floor(wood)}/{Math.floor(maxWood)}
                        </div>
                        <div className="resource-rate">
                            +{Math.floor(woodSecond)}/s
                        </div>
                    </div>
                </div>
                <div className={divVisibility.stoneResource ? 'hidden' : 'resource-row'}>
                    <div className="resource-name">
                        <img src="img/stone_icon.png" alt="stone-Icon"  style={{ width: '22px', height: 'auto', verticalAlign: 'middle' }}></img>Stone:
                    </div>
                    <div className="resource-numbers">
                        <div className={stone == maxStone ? "blue-text resource-capacity" : "resource-capacity"}>
                        {Math.floor(stone)}/{Math.floor(maxStone)}
                        </div>
                        <div className="resource-rate">
                            +{Math.floor(stoneSecond)}/s
                        </div>
                    </div>
                </div>
                <div className={divVisibility.goldResource ? 'hidden' : 'resource-row'}>
                    <div className="resource-name">
                        <img src="img/gold_icon.png" alt="gold-Icon"  style={{ width: '22px', height: 'auto', verticalAlign: 'middle' }}></img>Gold:
                    </div>
                    <div className="resource-numbers">
                        <div className="resource-capacity">
                        {Math.floor(gold)}/{Math.floor(maxGold)}
                        </div>
                        <div className="resource-rate">
                            +{Math.floor(goldSecond)}/s
                        </div>
                    </div>
                </div>
                <div className={divVisibility.foodResource ? 'hidden' : 'resource-row'}>
                    <div className="resource-name">
                        <img src="img/food_icon.png" alt="food-Icon"  style={{ width: '22px', height: 'auto', verticalAlign: 'middle' }}></img>Food:
                    </div>
                    <div className="resource-numbers">
                        <div className="resource-capacity">
                        {Math.floor(food)}/{Math.floor(maxFood)}
                        </div>
                        <div className="resource-rate">
                            +{Math.floor(foodSecond)}/s
                        </div>
                    </div>
                </div>
                <div className={divVisibility.timeResource ? 'hidden' : 'resource-row'}>
                    <div className="resource-name">
                        <img src="img/time_icon.png" alt="time-Icon"  style={{ width: '22px', height: 'auto', verticalAlign: 'middle' }}></img>Time Energy:
                    </div>
                    <div className="resource-numbers">
                        <div className="resource-capacity">
                        {Math.floor(time)}/{Math.floor(maxTime)}
                        </div>
                        <div className="resource-rate">
                            +{Math.floor(timeSecond)}/s
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};