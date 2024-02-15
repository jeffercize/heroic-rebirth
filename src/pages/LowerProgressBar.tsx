

import React from 'react';
import { StatsProvider, useMyStatsContext } from '../data/StatsContext';
import { ResourcesProvider, useMyResourcesContext } from '../data/ResourcesContext';




export default function LowerProgressBar(eventObject: any) {
    const { mana, setMana, maxMana, setMaxMana, manaSecond, setManaSecond } = useMyResourcesContext();
    const { charisma, setCharisma } = useMyStatsContext();
    return (
        <div className="progress-bar">
            <h3 className="progress-label">Energy: {parseFloat(mana.toFixed(2)).toString()} / {parseFloat(maxMana.toFixed(2)).toString()}</h3>
            <progress className="progress-bar" value={parseFloat(mana.toFixed(2)).toString()} max={parseFloat(maxMana.toFixed(2)).toString()}></progress>
        </div>
    );
};