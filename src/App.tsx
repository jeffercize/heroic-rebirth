import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file for styling
import SideBarLeft from './pages/SideBarLeft'
import SkillList from './pages/SkillList';
import LowerProgressBar from './pages/LowerProgressBar';
import CampusMain from './pages/CampusMain';
import EventList from './pages/EventList';
import Controller from './Controller';
import { StatsProvider, useMyStatsContext } from './data/StatsContext';
import { ResourcesProvider } from './data/ResourcesContext';
import { VisibilityProvider, useVisibilityContext } from './data/VisibilityContext';
import {useReducer} from 'react';
import { EventLogProvider } from './data/EventContext';



function App() {
  return (
    <StatsProvider>
      <ResourcesProvider>
        <VisibilityProvider>
          <EventLogProvider>
            <div className="container">
              <Controller></Controller>
              {/* Upper section */}
              <div className="upper-section">
                <h2 className="upper-label">Heroic Rebirth</h2>
              </div>

              {/* Middle section */}
              <div className="middle-section">
                <SideBarLeft></SideBarLeft>
                <CampusMain></CampusMain>
                <SkillList></SkillList>
                <EventList></EventList>
              </div>

              {/* Lower section */}
              <div className="lower-section">
                <LowerProgressBar></LowerProgressBar>
              </div>

            </div>
          </EventLogProvider>
        </VisibilityProvider>
      </ResourcesProvider>
    </StatsProvider>
  );
}

export default App;
