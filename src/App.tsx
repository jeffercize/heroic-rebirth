import React, { useState, useEffect, useRef } from 'react';
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
import GoalBar from './pages/GoalBar';
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
  
  const [hasWindowWidthCollapse, setHasWindowWidthCollapse] = useState(false);
  useEffect(() => {
    if (windowWidth < 800 && !hasWindowWidthCollapse) { 
      setHasWindowWidthCollapse(true);
      setShowEventList(false);
      setShowSideBarLeft(false);
    } else if (windowWidth >= 800) {
      setHasWindowWidthCollapse(false);
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

  const [sidebarHeight, setSidebarHeight] = useState(0);
  const [sidebarOffset, setSidebarOffset] = useState(0);
  const upperSectionRef = useRef<HTMLDivElement>(null);
  const lowerSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSidebarHeight = (event?: Event) => {
      const upperSectionHeight = upperSectionRef.current ? upperSectionRef.current.offsetHeight : 0;
      const lowerSectionHeight = lowerSectionRef.current ? lowerSectionRef.current.offsetHeight : 0;
      const viewportHeight = window.innerHeight;
      const sidebarHeight = viewportHeight - upperSectionHeight - lowerSectionHeight;
      setSidebarHeight(sidebarHeight);
      setSidebarOffset(upperSectionHeight);
    };

    // Call the function initially to set the height
    updateSidebarHeight();

      // Create a new ResizeObserver instance
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          if (entry.target === lowerSectionRef.current) {
            updateSidebarHeight();
          }
        }
      });

    // Add the event listener when the component mounts
    window.addEventListener('resize', updateSidebarHeight);

    // Start observing the lowerSection element
    if (lowerSectionRef.current) {
      resizeObserver.observe(lowerSectionRef.current);
    }

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateSidebarHeight);
      if (lowerSectionRef.current) {
        resizeObserver.unobserve(lowerSectionRef.current);
      }
    }
  }, []);

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
                  <div className="upper-section" ref={upperSectionRef}>
                    <h2 className="upper-label">Heroic Rebirth</h2>
                  </div>

                  

                  {/* Middle section */}
                  <div className="middle-section">
                    {!isMobile && (<div ref={sideBarRef}>
                      <div className={showSideBarLeft ? 'slide-in-left' : 'slide-out-left'} style={{top: sidebarOffset, height: sidebarHeight }}>
                        <SideBarLeft changeMainComponent={changeMainComponent}></SideBarLeft>
                      </div>
                      {windowWidth < 800 && !isMobile && <button style={{ height: '100%' }} onClick={() => {
                        setShowSideBarLeft(!showSideBarLeft);
                        if (windowWidth <= 800 && showEventList) setShowEventList(false);
                      }}>{showSideBarLeft ? "<" : ">"}</button>}
                    </div>)}

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
                    {/* SideBarLeft is here as well as above to deal with a layout issue with the sidebar showing under everything else on mobile */}
                    {isMobile && (<div ref={sideBarRef}>
                      <div className={showSideBarLeft ? 'slide-in-left' : 'slide-out-left'} style={{top: sidebarOffset, height: sidebarHeight }}>
                        <SideBarLeft changeMainComponent={changeMainComponent}></SideBarLeft>
                      </div>
                      {windowWidth < 800 && !isMobile && <button style={{ height: '100%' }} onClick={() => {
                        setShowSideBarLeft(!showSideBarLeft);
                        if (windowWidth <= 800 && showEventList) setShowEventList(false);
                      }}>{showSideBarLeft ? "<" : ">"}</button>}
                    </div>)}
                    <div ref={eventListRef}>
                      {windowWidth < 800 && !isMobile && <button style={{ height: '100%' }} onClick={() => {
                        setShowEventList(!showEventList);
                        if (windowWidth <= 800 && showSideBarLeft) setShowSideBarLeft(false);
                      }}>{showEventList ? ">" : "<"}</button>}
                      <div ref={eventListRef} className={showEventList ? 'slide-in-right' : 'slide-out-right'} style={{top: sidebarOffset, height: sidebarHeight }}>
                        <EventList></EventList>
                      </div>
                    </div>
                  </div>

                  {/* Lower section */}
                  <div className="lower-section" ref={lowerSectionRef}>
                    <GoalBar></GoalBar>
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
