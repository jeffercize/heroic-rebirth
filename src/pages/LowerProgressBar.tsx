

import React from 'react';
import './LowerProgressBar.css';
import { StatsProvider, useMyStatsContext } from '../data/StatsContext';
import { useMyResourcesContext } from '../data/ResourcesContext';




export default function LowerProgressBar(eventObject: any) {
    const resources = useMyResourcesContext();
    const stats = useMyStatsContext();
    return (
        <div className="progress-container">
            <div className="progress-bar">
                <div className="progress-bar-fill" style={{width: `${(stats.experience/stats.experienceLevelUp)*100}%`}}></div>
                <div className="progress-label">
                    <div className="progress-display">
                        <img src={`img/xp_icon.png`} alt={"stamina"} className="progress-icon" />{Math.floor(stats.experience)}/{parseFloat(stats.experienceLevelUp.toFixed(2))}
                        {stats.experienceSecond !== 0 && 
                            ` (${stats.experienceSecond > 0 ? '+' : '-'}${Math.abs(Math.floor(stats.experienceSecond))}/s)`}
                    </div>
                </div>
            </div>
        </div>
    );
};