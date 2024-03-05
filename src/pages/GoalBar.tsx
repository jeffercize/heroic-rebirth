import React from 'react';
import { useEventLogContext } from '../data/EventContext';
import './LowerResourceBar.css';

export default function LowerResourceBar() {
  const { eventLog } = useEventLogContext();
  return (
    <div className="goal-container">
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