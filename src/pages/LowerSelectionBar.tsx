import React, { useRef, useEffect } from 'react';
import { useMyResourcesContext } from '../data/ResourcesContext';
import { MainComponentType } from '../App';
import './LowerSelectionBar.css';

type LowerResourceBarProps = {
  changeMainComponent: (componentName: MainComponentType) => void;
  currentMainComponent: MainComponentType;
};

export default function LowerSelectionBar({ changeMainComponent, currentMainComponent }: { changeMainComponent: (componentName: MainComponentType) => void, currentMainComponent: MainComponentType }) {
  const resources = useMyResourcesContext();
  const containerRef = useRef<HTMLDivElement | null>(null);
  console.log(currentMainComponent);

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

  return (
    <div className="selection-bar-padder">
      <div className="selection-bar-padding">_</div>
      <div className="selection-bar-container" ref={containerRef}>
      <div className={`selection-bar-button ${currentMainComponent === 'CampusMain' ? 'active' : ''}`} role="button" onClick={() => changeMainComponent('CampusMain')}>
              <img src="img/town_icon.png" alt="town"></img>
              <label className="common-button-label">Town</label>
          </div>
          <div className={`selection-bar-button ${currentMainComponent === 'FollowersMain' ? 'active' : ''}`} role="button" onClick={() => changeMainComponent('FollowersMain')}>
              <img src="img/follower_icon.png" alt="followers"></img>
              <label className="common-button-label">Followers</label>
          </div>
          <div className={`selection-bar-button ${currentMainComponent === 'ExplorationMain' ? 'active' : ''}`} role="button" onClick={() => changeMainComponent('ExplorationMain')}>
              <img src="img/exploration_icon.png" alt="exploration"></img>
              <label className="common-button-label">Exploration</label>
          </div>
          <div className={`selection-bar-button ${currentMainComponent === 'StatsComponent' ? 'active' : ''}`} onClick={() => changeMainComponent('StatsComponent')}>
              <img src="img/stats_icon.png" alt="stats"></img>
              <label className="common-button-label">Stats</label>
          </div>
          <div className={`selection-bar-button ${currentMainComponent === 'HelpComponent' ? 'active' : ''}`} onClick={() => changeMainComponent('HelpComponent')}>
              <img src="img/help_icon.png" alt="help"></img>
              <label className="common-button-label">Help</label>
          </div>
          <div className={`selection-bar-button ${currentMainComponent === 'OptionsComponent' ? 'active' : ''}`} onClick={() => changeMainComponent('OptionsComponent')}>
              <img src="img/options_icon.png" alt="options"></img>
              <label className="common-button-label">Options</label>
          </div>
          <div className={`selection-bar-button ${currentMainComponent === 'AboutComponent' ? 'active' : ''}`} onClick={() => changeMainComponent('AboutComponent')}>
              <img src="img/about_icon.png" alt="about"></img>
              <label className="common-button-label">About</label>
          </div>
      </div>
      <div className="selection-bar-padding">_</div>
    </div>
  );
};