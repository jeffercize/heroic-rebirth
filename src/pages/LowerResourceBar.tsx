import React from 'react';
import { useMyResourcesContext } from '../data/ResourcesContext';
import './LowerResourceBar.css';

export const createResourceItem = (resources: any, resourceName: string) => {
    const isMax = resources[resourceName as keyof typeof resources] === resources['max' + resourceName.charAt(0).toUpperCase() + resourceName.slice(1) as keyof typeof resources];
    return (
      <div className="resource-row">
        <div className="resource-item">
          <img src={`img/${resourceName}_icon.png`} alt={resourceName} className="resource-icon" />
          <div className={`resource-label ${isMax ? 'max-resource' : ''}`}>
            {Math.floor(resources[resourceName as keyof typeof resources])}/{parseFloat(resources['max' + resourceName.charAt(0).toUpperCase() + resourceName.slice(1) as keyof typeof resources].toFixed(2))}
          </div>
        </div>
      </div>
    );
  };


export default function LowerResourceBar() {
  const resources = useMyResourcesContext();

  return (
    <div className="resource-bar-container">
        {createResourceItem(resources, 'wood')}
        {createResourceItem(resources, 'stone')}
        {createResourceItem(resources, 'gold')}
    </div>
  );
};