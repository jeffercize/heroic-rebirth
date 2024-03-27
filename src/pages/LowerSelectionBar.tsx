import React, { useRef, useEffect } from 'react';
import { useMyResourcesContext } from '../data/ResourcesContext';
import { MainComponentType } from '../App';
import { useVisibilityContext, useVisibilitySettersContext } from '../data/VisibilityContext';
import './LowerSelectionBar.css';

export default function LowerSelectionBar({ changeMainComponent, currentMainComponent }: { changeMainComponent: (componentName: MainComponentType) => void, currentMainComponent: MainComponentType }) {
  const resources = useMyResourcesContext();
  const { divVisibility } = useVisibilityContext();
  const { setVisibility, toggleVisibility} = useVisibilitySettersContext();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (containerRef.current) {
        containerRef.current.scrollLeft += e.deltaY;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const goFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if ((document.documentElement as any).mozRequestFullScreen) { /* Firefox */
      (document.documentElement as any).mozRequestFullScreen();
    } else if ((document.documentElement as any).webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      (document.documentElement as any).webkitRequestFullscreen();
    } else if ((document.documentElement as any).msRequestFullscreen) { /* IE/Edge */
      (document.documentElement as any).msRequestFullscreen();
    }
  };

  return (
    <div className="selection-bar-padder">
      <div className="selection-bar-padding">{'<'}</div>
      <div className="selection-bar-container" ref={containerRef}>
      <div className={`selection-bar-button ${currentMainComponent === 'CampusMain' ? 'active' : ''}`} role="button" onClick={() => {
                changeMainComponent('CampusMain')
                setVisibility('resourceBar', false)
                setVisibility('goalBar', false)
                }}>
              <img src="img/town_icon.png" alt="town" className="selection-image"></img>
              <label className="lower-button-label">Home</label>
          </div>
          <div className={`selection-bar-button ${divVisibility["inventoryTab"] ? 'hidden' : ''} ${currentMainComponent === 'InventoryMain' ? 'active' : ''}`} role="button" onClick={() => {
                changeMainComponent('InventoryMain')
                setVisibility('resourceBar', true)
                setVisibility('goalBar', true)
                }}>
              <img src="img/inventory_icon.png" alt="" className="selection-image"></img>
              <label className="lower-button-label">Inventory</label>
          </div>
          <div className={`selection-bar-button ${divVisibility["explorationTab"] ? 'hidden' : ''} ${currentMainComponent === 'ExplorationMain' ? 'active' : ''}`} role="button" onClick={() => {
                changeMainComponent('ExplorationMain')
                setVisibility('resourceBar', true)
                setVisibility('goalBar', true)
                }}>
              <img src="img/exploration_icon.png" alt="exploration" className="selection-image"></img>
              <label className="lower-button-label">Exploration</label>
          </div>
          <div className={`selection-bar-button ${divVisibility["followersTab"] ? 'hidden' : ''} ${currentMainComponent === 'FollowersMain' ? 'active' : ''}`} role="button" onClick={() => {
                changeMainComponent('FollowersMain')
                setVisibility('resourceBar', false)
                setVisibility('goalBar', true)
                }}>
              <img src="img/follower_icon.png" alt="followers" className="selection-image"></img>
              <label className="lower-button-label">Followers</label>
          </div>
          <div className={`selection-bar-button ${currentMainComponent === 'StatsComponent' ? 'active' : ''}`} onClick={() => {
                changeMainComponent('StatsComponent')
                setVisibility('resourceBar', false)
                setVisibility('goalBar', false)
                }}>
              <img src="img/stats_icon.png" alt="stats" className="selection-image"></img>
              <label className="lower-button-label">Stats</label>
          </div>
          <div className={`selection-bar-button ${currentMainComponent === 'HelpComponent' ? 'active' : ''}`} onClick={() => {
                changeMainComponent('HelpComponent')
                setVisibility('resourceBar', false)
                setVisibility('goalBar', false)
                }}>
              <img src="img/help_icon.png" alt="help" className="selection-image"></img>
              <label className="lower-button-label">Help</label>
          </div>
          <div className={`selection-bar-button ${currentMainComponent === 'OptionsComponent' ? 'active' : ''}`} onClick={() => {
                changeMainComponent('OptionsComponent')
                setVisibility('resourceBar', false)
                setVisibility('goalBar', false)
                }}>
              <img src="img/options_icon.png" alt="options" className="selection-image"></img>
              <label className="lower-button-label">Options</label>
          </div>
          <div className={`selection-bar-button ${currentMainComponent === 'AboutComponent' ? 'active' : ''}`} onClick={() => {
                changeMainComponent('AboutComponent')
                setVisibility('resourceBar', false)
                setVisibility('goalBar', false)
                }}>
              <img src="img/about_icon.png" alt="about" className="selection-image"></img>
              <label className="lower-button-label">About</label>
          </div>
      </div>
      <div className="selection-bar-padding">{'>'}</div>
    </div>
  );
};