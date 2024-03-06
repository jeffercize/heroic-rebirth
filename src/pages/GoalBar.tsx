import React from 'react';
import { useEventLogContext } from '../data/EventContext';
import { useVisibilityContext } from '../data/VisibilityContext';
import './LowerResourceBar.css';

export default function LowerResourceBar() {
  const { eventLog } = useEventLogContext();
  const { divVisibility } = useVisibilityContext();
  return (
    <div className={`resource-row ${divVisibility['goalBar'] ? 'hidden' : 'goal-container'}`}>
        {eventLog.map((event, index) => (
          <div className="goal-item" key={index}>
            <div className="goal-label">
              {event.title === "Beginnings" && <div className="goal-body">Current Goal: {event.title} -- {event.body}</div>}
            </div>
          </div>
        ))}
    </div>
  );
};