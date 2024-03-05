import React from 'react';
import { useMyResourcesContext } from '../data/ResourcesContext';
import { DivVisibility, useVisibilityContext } from '../data/VisibilityContext';
import './LowerResourceBar.css';

export const createResourceItem = (resources: any, resourceName: string, divVisibility: DivVisibility) => {

  const isMax = resources[resourceName as keyof typeof resources] === resources['max' + resourceName.charAt(0).toUpperCase() + resourceName.slice(1) as keyof typeof resources];
  const isHidden = divVisibility[resourceName + 'Resource'];
    
  return (
    <div className={`resource-row ${isHidden ? 'hidden' : ''}`}>
      <div className="resource-item">
        <img src={`img/${resourceName}_icon.png`} alt={resourceName} className="resource-icon" />
        <div className={`resource-label ${isMax ? 'max-resource' : ''}`}>
          {formatNumber(resources[resourceName as keyof typeof resources])}/{formatNumber(parseFloat(resources['max' + resourceName.charAt(0).toUpperCase() + resourceName.slice(1) as keyof typeof resources].toFixed(2)))}
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

export default function LowerResourceBar() {
  const resources = useMyResourcesContext();
  const { divVisibility } = useVisibilityContext();

  return (
    <div className="resource-bar-container">
        {createResourceItem(resources, 'wood', divVisibility)}
        {createResourceItem(resources, 'stone', divVisibility)}
        {createResourceItem(resources, 'gold', divVisibility)}
    </div>
  );
};