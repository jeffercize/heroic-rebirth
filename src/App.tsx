import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
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
  const lowerSelectionBarRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 800) { // Change 800 to your preferred breakpoint
      setShowEventList(false);
      setShowSideBarLeft(false);
    } else {
      setShowEventList(true);
      setShowSideBarLeft(true);
    }
  }, [windowWidth]);


  const changeMainComponent = (componentName: MainComponentType) => {
    setMainComponent(componentName);
  };

  window.addEventListener('keydown', function(e) {
    if(e.key === 'Enter') {
        e.preventDefault();
    }
  });

  const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      if (lowerSelectionBarRef.current && lowerSelectionBarRef.current.contains(eventData.event.target as Node)) {
        return;
      }
      if(showSideBarLeft){
        setShowEventList(false);
        setShowSideBarLeft(false);
      }
      else{
        setShowEventList(true);
      }
    },
    onSwipedRight: (eventData) => {
      if (lowerSelectionBarRef.current && lowerSelectionBarRef.current.contains(eventData.event.target as Node)) {
        return;
      }
      if(showEventList){
        setShowSideBarLeft(false);
        setShowEventList(false);
      }
      else{
        setShowSideBarLeft(true);
      }
    },
    trackMouse: true
  });

  const sideBarRef = React.useRef<HTMLDivElement>(null);
  const eventListRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (windowWidth <= 800){
      if (sideBarRef.current && !sideBarRef.current.contains(event.target as Node)) {
        setShowSideBarLeft(false);
      }
      if (eventListRef.current && !eventListRef.current.contains(event.target as Node)) {
        setShowEventList(false);
      }
    }
  };


  return (
    <StatsProvider>
      <ResourcesProvider>
        <VisibilityProvider>
          <EventLogProvider>
            <FollowersProvider>
              <BuildingCostProvider>
                <div className="container" {...handlers} onClick={handleClickOutside}>
                  <Controller></Controller>
                  
                  {/* Upper section */}
                  <div className="upper-section">
                    <h2 className="upper-label">Heroic Rebirth</h2>
                  </div>

                  {/* Middle section */}
                  <div className="middle-section">
                  
                  {showSideBarLeft && <div ref={sideBarRef}><SideBarLeft changeMainComponent={changeMainComponent}></SideBarLeft></div>}
                  {windowWidth < 800 && !isMobile && <button onClick={() => {
                    setShowSideBarLeft(!showSideBarLeft);
                    if (windowWidth <= 800 && showEventList) setShowEventList(false);
                  }}>{showSideBarLeft ? "<" : ">"}</button>}
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
                    
                    {windowWidth < 800 && !isMobile && <button onClick={() => {
                      setShowEventList(!showEventList);
                      if (windowWidth <= 800 && showSideBarLeft) setShowSideBarLeft(false);
                    }}>{showEventList ? ">" : "<"}</button>}
                    {showEventList && <div ref={eventListRef}><EventList></EventList></div>}
                  </div>

                  {/* Lower section */}
                  <div className="lower-section">
                    <LowerResourceBar></LowerResourceBar>
                    <div ref={lowerSelectionBarRef}>
                      <LowerSelectionBar changeMainComponent={changeMainComponent} currentMainComponent={mainComponent}></LowerSelectionBar>
                    </div>                    
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
