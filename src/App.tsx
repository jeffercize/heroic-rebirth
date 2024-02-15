import React, { useState } from 'react';
import './App.css'; // Import your CSS file for styling
import SideBarLeft from './pages/SideBarLeft'
import SkillList from './pages/SkillList';
import LowerProgressBar from './pages/LowerProgressBar';
import CampusMain from './pages/CampusMain';
import { StatsProvider, useMyStatsContext } from './data/StatsContext';
import { ResourcesProvider, useMyResourcesContext } from './data/ResourcesContext';
import {useReducer} from 'react';



function App() {
  return (
    <StatsProvider>
      <ResourcesProvider>
        <div className="container">

          {/* Upper section */}
          <div className="upper-section">
            <h2 className="upper-label">Heroic Rebirth</h2>
          </div>

          {/* Middle section */}
          <div className="middle-section">
            <SideBarLeft></SideBarLeft>
            <CampusMain></CampusMain>
            <SkillList></SkillList>
          </div>

          {/* Lower section */}
          <div className="lower-section">
            <LowerProgressBar></LowerProgressBar>
          </div>

        </div>
      </ResourcesProvider>
    </StatsProvider>
  );
}

export default App;
