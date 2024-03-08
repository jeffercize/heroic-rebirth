import React from 'react';
import { useMyStatsContext } from '../data/StatsContext';
import { DivVisibility, useVisibilityContext } from '../data/VisibilityContext';
import './LowerStatBar.css';

export const createStatItem = (stats: any, statName: string, divVisibility: DivVisibility) => {

  const isMax = stats[statName as keyof typeof stats] === stats['max' + statName.charAt(0).toUpperCase() + statName.slice(1) as keyof typeof stats];
  const isHidden = divVisibility[statName + 'Stat'];
    
  return (
    <div className={`stat-row ${isHidden ? 'hidden' : ''}`}>
      <div className="stat-item">
        <img src={`img/${statName}_icon.png`} alt={statName} className="stat-icon" />
        <div className={"stat-label"}>
          {formatNumber(stats[statName as keyof typeof stats])}
        </div>
      </div>
    </div>
  );
};

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toPrecision(3) + 'M';
  } else if (num >= 10000) {
    return (num / 1000).toPrecision(3) + 'K';
  } else if (num >= 10) {
    return num.toPrecision(4);
  } else if (num >= 1) {
    return num.toPrecision(3);
  } else {
    return num.toPrecision(2);
  }
}

export default function LowerStatBar() {
  const stats = useMyStatsContext();
  const { divVisibility } = useVisibilityContext();

  return (
    <div className={`stat-row ${divVisibility['statBar'] ? 'hidden' : 'stat-bar-container'}`}>
        {createStatItem(stats, 'strength', divVisibility)}
    </div>
  );
};