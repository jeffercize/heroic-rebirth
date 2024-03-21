import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import './App.css'; // Import your CSS file for styling
import SideBarLeft from './pages/SideBarLeft'
import SkillList from './pages/SkillList';
import LowerProgressBar from './pages/LowerProgressBar';
import LowerResourceBar from './pages/LowerResourceBar';
import LowerStatBar from './pages/LowerStatBar';
import CampusMain from './pages/mainwindows/CampusMain';
import FollowersMain from './pages/mainwindows/FollowersMain';
import ExplorationMain from './pages/mainwindows/ExplorationMain';
import InventoryMain from './pages/mainwindows/InventoryMain';
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
import { InventoryContext, InventoryProvider } from './data/InventoryContext';


export type MainComponentType = 'CampusMain' | 'InventoryMain' |'ExplorationMain' | 'FollowersMain' |'HelpComponent' | 'StatsComponent' | 'OptionsComponent' | 'AboutComponent';


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
    if (windowWidth <= 800 && !hasWindowWidthCollapse) { 
      setHasWindowWidthCollapse(true);
      setShowEventList(false);
      setShowSideBarLeft(false);
    } else if (windowWidth > 800) {
      setHasWindowWidthCollapse(false);
      setShowEventList(true);
      setShowSideBarLeft(true);
    }
  }, [windowWidth]);


  const changeMainComponent = (componentName: MainComponentType) => {
    setMainComponent(componentName);
    if (windowWidth <= 800){
      setShowEventList(false);
      setShowSideBarLeft(false);
    }
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
        // Check if the click event happened on one of the buttons
        if (event.target instanceof HTMLButtonElement) {
          return;
        }
        setShowSideBarLeft(false);
      }
      if (eventListRef.current && !eventListRef.current.contains(event.target as Node)) {
        // Check if the click event happened on one of the buttons
        if (event.target instanceof HTMLButtonElement) {
          return;
        }
        setShowEventList(false);
      }
    }
  };

  const [sidebarHeight, setSidebarHeight] = useState(0);
  const [sidebarOffset, setSidebarOffset] = useState(0);
  const upperSectionRef = useRef<HTMLDivElement>(null);
  const lowerSectionRef = useRef<HTMLDivElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSidebarHeight = (event?: Event) => {
      const upperSectionHeight = upperSectionRef.current ? upperSectionRef.current.offsetHeight : 0;
      const lowerSectionHeight = lowerSectionRef.current ? lowerSectionRef.current.offsetHeight : 0;
      const progressBarHeight = progressBar.current ? progressBar.current.offsetHeight : 0;
      const viewportHeight = window.innerHeight;
      if (window.innerWidth <= 800) {
        const sidebarHeight = viewportHeight - upperSectionHeight - progressBarHeight;
        setSidebarHeight(sidebarHeight);
        setSidebarOffset(upperSectionHeight);
      }
      else {
        const sidebarHeight = viewportHeight - upperSectionHeight - lowerSectionHeight;
        setSidebarHeight(sidebarHeight);
        setSidebarOffset(upperSectionHeight);
      }
      
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
                <InventoryProvider>
                  <div className="container" {...handlers} onClick={handleClickOutside}>
                    <Controller></Controller>
                    
                    {/* Upper section */}
                    <div className="upper-section" ref={upperSectionRef}>
                      <h2 className="upper-label">Heroic Rebirth</h2>
                      <div className="button-container">
                        {windowWidth <= 800 && !isMobile && <button onClick={() => {
                          setShowSideBarLeft(!showSideBarLeft);
                          if (windowWidth <= 800 && showEventList) setShowEventList(false);
                        }}>{showSideBarLeft ? "<" : ">"}</button>}
                        {windowWidth <= 800 && !isMobile && <button onClick={() => {
                          setShowEventList(!showEventList);
                          if (windowWidth <= 800 && showSideBarLeft) setShowSideBarLeft(false);
                        }}>{showEventList ? ">" : "<"}</button>}
                      </div>
                    </div>                  

                    {/* Middle section */}
                    <div className="middle-section">

                      {windowWidth > 800 && (<div ref={sideBarRef}>
                        <div className={showSideBarLeft ? 'slide-in-left' : 'slide-out-left'} style={{top: sidebarOffset, height: sidebarHeight }}>
                          <SideBarLeft changeMainComponent={changeMainComponent}></SideBarLeft>
                        </div>
                      </div>)}                      

                      {(() => {
                        switch (mainComponent) {
                          case 'CampusMain': return <CampusMain />;
                          case 'InventoryMain': return <InventoryMain />;
                          case 'ExplorationMain': return <ExplorationMain />;
                          case 'FollowersMain': return <FollowersMain />;
                          case 'HelpComponent': return <CampusMain />;
                          case 'StatsComponent': return <CampusMain />;
                          case 'OptionsComponent': return <CampusMain />;
                          case 'AboutComponent': return <CampusMain />;
                          default: return null;
                        }
                      })()}

                      {windowWidth > 800 && (<div ref={eventListRef}>
                        <div ref={eventListRef} className={showEventList ? 'slide-in-right' : 'slide-out-right'} style={{top: sidebarOffset, height: sidebarHeight }}>
                          <EventList></EventList>
                        </div>
                      </div>)}

                    </div>
                    

                    {/* Lower section */}
                    <div className="lower-section" ref={lowerSectionRef}>
                      <GoalBar></GoalBar>
                      <LowerStatBar></LowerStatBar>
                      <LowerResourceBar></LowerResourceBar>
                      <div ref={lowerSelectionBarRef}>
                        <LowerSelectionBar changeMainComponent={changeMainComponent} currentMainComponent={mainComponent}></LowerSelectionBar>
                      </div>
                      {windowWidth <= 800 && (<div ref={sideBarRef}>
                        <div className={showSideBarLeft ? 'slide-in-left' : 'slide-out-left'} style={{top: sidebarOffset, height: sidebarHeight }}>
                          <SideBarLeft changeMainComponent={changeMainComponent}></SideBarLeft>
                        </div>
                      </div>)}
                      {windowWidth <= 800 && (<div ref={eventListRef}>
                        <div ref={eventListRef} className={showEventList ? 'slide-in-right' : 'slide-out-right'} style={{top: sidebarOffset, height: sidebarHeight }}>
                          <EventList></EventList>
                        </div>
                      </div>)}
                      <LowerProgressBar ref={progressBar}></LowerProgressBar>
                    </div>
                    
                  </div>
                  <EventPopUp></EventPopUp>
                </InventoryProvider>
              </BuildingCostProvider>
            </FollowersProvider>
          </EventLogProvider>
        </VisibilityProvider>
      </ResourcesProvider>
    </StatsProvider>
  );
}

export default App;
