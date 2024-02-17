

import React from 'react';
import { StatsProvider, useMyStatsContext } from '../data/StatsContext';
import { useMyResourcesContext } from '../data/ResourcesContext';




export default function LowerProgressBar(eventObject: any) {
    const { mana, maxMana } = useMyResourcesContext();
    return (
        <div className="progress-bar">
            <h3 className="progress-label">Energy: {parseFloat(mana.toFixed(2)).toString()} / {parseFloat(maxMana.toFixed(2)).toString()}</h3>
            <progress className="progress-bar" value={parseFloat(mana.toFixed(2)).toString()} max={parseFloat(maxMana.toFixed(2)).toString()}></progress>
        </div>
    );
};