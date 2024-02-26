import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file for styling
import SideBarLeft from './pages/SideBarLeft'
import SkillList from './pages/SkillList';
import LowerProgressBar from './pages/LowerProgressBar';
import LowerResourceBar from './pages/LowerResourceBar';
import CampusMain from './pages/CampusMain';
import FollowersMain from './pages/FollowersMain';
import ExplorationMain from './pages/ExplorationMain';
import EventList from './pages/EventList';
import LowerSelectionBar from './pages/LowerSelectionBar';
import Controller from './Controller';
import { StatsProvider, useMyStatsContext } from './data/StatsContext';
import { ResourcesProvider } from './data/ResourcesContext';
import { VisibilityProvider, useVisibilityContext } from './data/VisibilityContext';
import { FollowersProvider } from './data/FollowersContext';
import { BuildingCostProvider } from './data/BuildingCostContext';
import { EventPopUp } from './components/EventPopUp';
import { EventLogProvider, useEventLogContext } from './data/EventContext';

export type MainComponentType = 'CampusMain' | 'FollowersMain' | 'ExplorationMain' |'HelpComponent' | 'StatsComponent' | 'OptionsComponent' | 'AboutComponent';


function App() {
  const [mainComponent, setMainComponent] = useState<MainComponentType>('CampusMain');
  const [showEventList, setShowEventList] = useState(false);
  const [showSideBarLeft, setShowSideBarLeft] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth <= 800 && showEventList && showSideBarLeft) { // Change 800 to your preferred breakpoint
      setShowEventList(false);
    }
  }, [windowWidth, showEventList, showSideBarLeft]);


  const changeMainComponent = (componentName: MainComponentType) => {
    setMainComponent(componentName);
  };

  window.addEventListener('keydown', function(e) {
    if(e.key === 'Enter') {
        e.preventDefault();
    }
  });


  return (
    <StatsProvider>
      <ResourcesProvider>
        <VisibilityProvider>
          <EventLogProvider>
            <FollowersProvider>
              <BuildingCostProvider>
              <div className="container">
                <Controller></Controller>
                
                {/* Upper section */}
                <div className="upper-section">
                  <h2 className="upper-label">Heroic Rebirth</h2>
                </div>

                {/* Middle section */}
                <div className="middle-section">
                  {showSideBarLeft && <SideBarLeft changeMainComponent={changeMainComponent}></SideBarLeft>}
                  <button onClick={() => {
                    setShowSideBarLeft(!showSideBarLeft);
                    if (windowWidth <= 800 && showEventList) setShowEventList(false); // Change 800 to your preferred breakpoint
                  }}>{showSideBarLeft ? "<" : ">"}</button>
                  {(() => {
                    switch (mainComponent) {
                      case 'CampusMain': return <CampusMain />;
                      case 'FollowersMain': return <FollowersMain />;
                      case 'ExplorationMain': return <ExplorationMain />;
                      case 'HelpComponent': return <CampusMain />;
                      case 'StatsComponent': return <CampusMain />;
                      case 'OptionsComponent': return <CampusMain />;
                      case 'AboutComponent': return <CampusMain />;
                      default: return null;
                    }
                  })()}
                  
                  <button onClick={() => {
                    setShowEventList(!showEventList);
                    if (windowWidth <= 800 && showSideBarLeft) setShowSideBarLeft(false); // Change 800 to your preferred breakpoint
                  }}>{showEventList ? ">" : "<"}</button>
                  {showEventList && <EventList></EventList>}
                </div>

                {/* Lower section */}
                <div className="lower-section">
                  <LowerResourceBar></LowerResourceBar>
                  <LowerSelectionBar changeMainComponent={changeMainComponent} currentMainComponent={mainComponent}></LowerSelectionBar>
                  <LowerProgressBar></LowerProgressBar>
                </div>

              </div>

              <EventPopUp></EventPopUp>
              </BuildingCostProvider>
            </FollowersProvider>
          </EventLogProvider>
        </VisibilityProvider>
      </ResourcesProvider>
    </StatsProvider>
  );
}

export default App;
