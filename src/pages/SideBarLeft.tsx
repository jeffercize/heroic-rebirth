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
    const { setMana, setMaxMana, setManaSecond, setGold, setMaxGold, setGoldSecond, setFood, setMaxFood, setFoodSecond, setStone, setMaxStone, setStoneSecond, setWood, setMaxWood, setWoodSecond } = useMyResourcesSettersContext();    
    const stats = useMyStatsContext();
    const { divVisibility } = useVisibilityContext();
    const { setVisibility, toggleVisibility} = useVisibilitySettersContext();

    function formatNumber(num: number): string {
        if (num >= 1000000) {
            return (num / 1000000).toPrecision(3) + 'M';
        } else if (num >= 10000) {
            return (num / 1000).toPrecision(3) + 'K';
        } else if (num >= 10) {
            return num.toPrecision(4);
        } else if (num >= 1) {
            return num.toPrecision(3);
        } else if (num >= 0.1){
            return num.toPrecision(3);
        } else if (num >= 0.01){
            return num.toPrecision(2);
        } else {
            return num.toPrecision(1);
        }
      }

    return (
        <div className="first-subsection">
            <h2 className="">Heroic Rebirth</h2>
            <div className="town-button common-compound-button" role="button" onClick={() => {
                changeMainComponent('CampusMain')
                setVisibility('resourceBar', false)
                setVisibility('goalBar', false)
                }}>
                <img src="img/town_icon.png" alt="town"></img>
                <label className="common-button-label">Home</label>
            </div>
            <div className={`common-compound-button ${divVisibility["inventoryTab"] ? 'hidden' : ''}`} role="button" onClick={() => {
                changeMainComponent('InventoryMain')
                setVisibility('resourceBar', true)
                setVisibility('goalBar', true)
                }}>
                <img src="img/inventory_icon.png" alt=""></img>
                <label className="common-button-label">Inventory</label>
            </div>
            <div className={`common-compound-button ${divVisibility["explorationTab"] ? 'hidden' : ''}`} role="button" onClick={() => {
                changeMainComponent('ExplorationMain')
                setVisibility('resourceBar', true)
                setVisibility('goalBar', true)
                }}>
                <img src="img/exploration_icon.png" alt="exploration"></img>
                <label className="common-button-label">Exploration</label>
            </div>
            <div className={`common-compound-button ${divVisibility["followersTab"] ? 'hidden' : ''}`} role="button" onClick={() => {
                changeMainComponent('FollowersMain')
                setVisibility('resourceBar', false)
                setVisibility('goalBar', true)
                }}>
                <img src="img/follower_icon.png" alt="followers"></img>
                <label className="common-button-label">Followers</label>
            </div>
            <div className="common-compound-button" role="button" onClick={() => {
                changeMainComponent('StatsComponent')
                setVisibility('resourceBar', false)
                setVisibility('goalBar', false)
                }}>
                <img src="img/stats_icon.png" alt="stats"></img>
                <label className="common-button-label">Stats</label>
            </div>
            <div className="common-compound-button" role="button" onClick={() => {
                changeMainComponent('HelpComponent')
                setVisibility('resourceBar', false)
                setVisibility('goalBar', false)
                }}>
                <img src="img/help_icon.png" alt="help"></img>
                <label className="common-button-label">Help</label>
            </div>
            <div className="common-compound-button" role="button" onClick={() => {
                changeMainComponent('OptionsComponent')
                setVisibility('resourceBar', false)
                setVisibility('goalBar', false)
                }}>
                <img src="img/options_icon.png" alt="options"></img>
                <label className="common-button-label">Options</label>
            </div>
            <div className="common-compound-button" role="button" onClick={() => {
                changeMainComponent('AboutComponent')
                setVisibility('resourceBar', false)
                setVisibility('goalBar', false)
                }}>
                <img src="img/about_icon.png" alt="about"></img>
                <label className="common-button-label">About</label>
            </div>
            <div className="section-compound-button" role="button" onClick={() => toggleVisibility('stats')}>
                <label className="section-label">
                Character Stats
                </label>
                <button className="common-button side-bar-button">V</button>
            </div>
            <div className={divVisibility.stats ? 'hidden resource-section' : 'resource-section'}>
                <div className={divVisibility.manaResouce ? 'hidden' : 'resource-row'}>
                    <div className="resource-name">
                        <img src="img/strength_icon.png" alt=""  style={{ width: '22px', height: 'auto', verticalAlign: 'middle' }}></img>Strength:
                    </div>
                    <div className="resource-numbers">
                        <div className={mana == maxMana ? "blue-text resource-capacity" : "resource-capacity"}>
                            {formatNumber(stats.strength)}
                        </div>
                        {stats.strengthSecond !== 0 && (
                            <div className="resource-rate">
                                +{formatNumber(stats.strengthSecond)}/s
                            </div>
                        )}
                    </div>
                </div>
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
                            {formatNumber(mana)}/{formatNumber(maxMana)}
                        </div>
                        <div className="resource-rate">
                            +{Math.round(manaSecond)}/s
                        </div>
                    </div>
                </div>
                <div className={divVisibility.woodResource ? 'hidden' : 'resource-row'}>
                    <div className="resource-name">
                        <img src="img/wood_icon.png" alt="wood-Icon"  style={{ width: '22px', height: 'auto', verticalAlign: 'middle' }}></img>Wood:
                    </div>
                    <div className="resource-numbers">
                        <div className={wood == maxWood ? "blue-text resource-capacity" : "resource-capacity"}>
                        {formatNumber(wood)}/{formatNumber(maxWood)}
                        </div>
                        <div className="resource-rate">
                            +{Math.round(woodSecond)}/s
                        </div>
                    </div>
                </div>
                <div className={divVisibility.stoneResource ? 'hidden' : 'resource-row'}>
                    <div className="resource-name">
                        <img src="img/stone_icon.png" alt="stone-Icon"  style={{ width: '22px', height: 'auto', verticalAlign: 'middle' }}></img>Stone:
                    </div>
                    <div className="resource-numbers">
                        <div className={stone == maxStone ? "blue-text resource-capacity" : "resource-capacity"}>
                        {formatNumber(stone)}/{formatNumber(maxStone)}
                        </div>
                        <div className="resource-rate">
                            +{Math.round(stoneSecond)}/s
                        </div>
                    </div>
                </div>
                <div className={divVisibility.goldResource ? 'hidden' : 'resource-row'}>
                    <div className="resource-name">
                        <img src="img/gold_icon.png" alt="gold-Icon"  style={{ width: '22px', height: 'auto', verticalAlign: 'middle' }}></img>Gold:
                    </div>
                    <div className="resource-numbers">
                        <div className="resource-capacity">
                        {formatNumber(gold)}/{formatNumber(maxGold)}
                        </div>
                        <div className="resource-rate">
                            +{Math.round(goldSecond)}/s
                        </div>
                    </div>
                </div>
                <div className={divVisibility.foodResource ? 'hidden' : 'resource-row'}>
                    <div className="resource-name">
                        <img src="img/food_icon.png" alt="food-Icon"  style={{ width: '22px', height: 'auto', verticalAlign: 'middle' }}></img>Food:
                    </div>
                    <div className="resource-numbers">
                        <div className="resource-capacity">
                        {formatNumber(food)}/{formatNumber(maxFood)}
                        </div>
                        <div className="resource-rate">
                            +{Math.round(foodSecond)}/s
                        </div>
                    </div>
                </div>
                <div className={divVisibility.timeResource ? 'hidden' : 'resource-row'}>
                    <div className="resource-name">
                        <img src="img/time_icon.png" alt="time-Icon"  style={{ width: '22px', height: 'auto', verticalAlign: 'middle' }}></img>Time Energy:
                    </div>
                    <div className="resource-numbers">
                        <div className="resource-capacity">
                        {formatNumber(time)}/{formatNumber(maxTime)}
                        </div>
                        <div className="resource-rate">
                            +{Math.round(timeSecond)}/s
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};