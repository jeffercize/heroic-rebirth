

import React from 'react';
import './LowerProgressBar.css';
import { StatsProvider, useMyStatsContext } from '../data/StatsContext';
import { useMyResourcesContext } from '../data/ResourcesContext';




export default function LowerProgressBar(eventObject: any) {
    const resources = useMyResourcesContext();
    return (
        <div className="progress-container">
            <div className="progress-bar">
                <div className="progress-bar-fill" style={{width: `${(resources.mana/resources.maxMana)*100}%`}}></div>
                <div className="progress-label">
                    <div className="progress-display">
                        <img src={`img/stamina_icon.png`} alt={"stamina"} className="progress-icon" />{Math.floor(resources.mana)}/{parseFloat(resources.maxMana.toFixed(2))}
                        {resources.manaSecond !== 0 && 
                            ` (${resources.manaSecond > 0 ? '+' : '-'}${Math.abs(Math.floor(resources.manaSecond))}/s)`}
                    </div>
                </div>
            </div>
        </div>
    );
};