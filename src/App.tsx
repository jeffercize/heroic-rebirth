import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file for styling
import SideBarLeft from './pages/SideBarLeft'
import SkillList from './pages/SkillList';
import LowerProgressBar from './pages/LowerProgressBar';
import CampusMain from './pages/CampusMain';
import FollowersMain from './pages/FollowersMain';
import EventList from './pages/EventList';
import Controller from './Controller';
import { StatsProvider, useMyStatsContext } from './data/StatsContext';
import { ResourcesProvider } from './data/ResourcesContext';
import { VisibilityProvider, useVisibilityContext } from './data/VisibilityContext';
import { FollowersProvider } from './data/FollowersContext';
import { BuildingCostProvider } from './data/BuildingCostContext';
import {useReducer} from 'react';
import { EventLogProvider } from './data/EventContext';

export type MainComponentType = 'CampusMain' | 'FollowersMain' | 'HelpComponent' | 'StatsComponent' | 'OptionsComponent' | 'AboutComponent';


function App() {
  const [mainComponent, setMainComponent] = useState<MainComponentType>('CampusMain');

  const changeMainComponent = (componentName: MainComponentType) => {
    setMainComponent(componentName);
  };

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
                  <SideBarLeft changeMainComponent={changeMainComponent}></SideBarLeft>
                  {(() => {
                    switch (mainComponent) {
                      case 'CampusMain': return <CampusMain />;
                      case 'FollowersMain': return <FollowersMain />;
                      case 'HelpComponent': return <CampusMain />;
                      case 'StatsComponent': return <CampusMain />;
                      case 'OptionsComponent': return <CampusMain />;
                      case 'AboutComponent': return <CampusMain />;
                      default: return null;
                    }
                  })()}
                  <SkillList></SkillList>
                  <EventList></EventList>
                </div>

                {/* Lower section */}
                <div className="lower-section">
                  <LowerProgressBar></LowerProgressBar>
                </div>

              </div>
              </BuildingCostProvider>
            </FollowersProvider>
          </EventLogProvider>
        </VisibilityProvider>
      </ResourcesProvider>
    </StatsProvider>
  );
}

export default App;
