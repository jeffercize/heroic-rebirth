import React, { useRef, useEffect } from 'react';
import { useMyResourcesContext } from '../data/ResourcesContext';
import { MainComponentType } from '../App';
import { useVisibilityContext } from '../data/VisibilityContext';
import './LowerSelectionBar.css';

type LowerResourceBarProps = {
  changeMainComponent: (componentName: MainComponentType) => void;
  currentMainComponent: MainComponentType;
};

export default function LowerSelectionBar({ changeMainComponent, currentMainComponent }: { changeMainComponent: (componentName: MainComponentType) => void, currentMainComponent: MainComponentType }) {
  const resources = useMyResourcesContext();
  const { divVisibility } = useVisibilityContext();
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
      <div className={`selection-bar-button ${currentMainComponent === 'CampusMain' ? 'active' : ''}`} role="button" onClick={() => changeMainComponent('CampusMain')}>
              <img src="img/town_icon.png" alt="town"></img>
              <label className="common-button-label">Home</label>
          </div>
          <div className={`selection-bar-button ${divVisibility["inventoryTab"] ? 'hidden' : ''} ${currentMainComponent === 'InventoryMain' ? 'active' : ''}`} role="button" onClick={() => changeMainComponent('InventoryMain')}>
              <img src="img/inventory_icon.png" alt=""></img>
              <label className="common-button-label">Inventory</label>
          </div>
          <div className={`selection-bar-button ${divVisibility["explorationTab"] ? 'hidden' : ''} ${currentMainComponent === 'ExplorationMain' ? 'active' : ''}`} role="button" onClick={() => changeMainComponent('ExplorationMain')}>
              <img src="img/exploration_icon.png" alt="exploration"></img>
              <label className="common-button-label">Exploration</label>
          </div>
          <div className={`selection-bar-button ${divVisibility["followersTab"] ? 'hidden' : ''} ${currentMainComponent === 'FollowersMain' ? 'active' : ''}`} role="button" onClick={() => changeMainComponent('FollowersMain')}>
              <img src="img/follower_icon.png" alt="followers"></img>
              <label className="common-button-label">Followers</label>
          </div>
          <div className={`selection-bar-button ${currentMainComponent === 'StatsComponent' ? 'active' : ''}`} onClick={() => changeMainComponent('StatsComponent')}>
              <img src="img/stats_icon.png" alt="stats"></img>
              <label className="common-button-label">Stats</label>
          </div>
          <div className={`selection-bar-button ${divVisibility["explorationTab"] ? '' : 'hidden'} ${currentMainComponent === 'HelpComponent' ? 'active' : ''}`} onClick={() => changeMainComponent('HelpComponent')}>
              <img src="img/help_icon.png" alt="help"></img>
              <label className="common-button-label">Help</label>
          </div>
          <div className={`selection-bar-button ${currentMainComponent === 'OptionsComponent' ? 'active' : ''}`} onClick={() => goFullscreen()}>
              <img src="img/options_icon.png" alt="options"></img>
              <label className="common-button-label">Options</label>
          </div>
          <div className={`selection-bar-button ${currentMainComponent === 'AboutComponent' ? 'active' : ''}`} onClick={() => goFullscreen()}>
              <img src="img/about_icon.png" alt="about"></img>
              <label className="common-button-label">About</label>
          </div>
      </div>
      <div className="selection-bar-padding">{'>'}</div>
    </div>
  );
};