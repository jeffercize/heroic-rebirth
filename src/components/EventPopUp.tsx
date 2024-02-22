import React, {useEffect, useState} from 'react';
import './EventPopUp.css';
import { useEventLogContext } from '../data/EventContext';

export const EventPopUp: React.FC = () => {
    const { eventLog, hasNewEvent, setHasNewEvent } = useEventLogContext();
    const latestEvent = eventLog[eventLog.length - 1];

    const closePopup = () => {
      setHasNewEvent(false);
    };

    return (
        <div className={`overlay ${hasNewEvent ? 'visible' : ''}`}>
            
            <div className="text-box">
                <button className="close-button" onClick={closePopup}>X</button>
                <h2>{latestEvent ? latestEvent.title: ''}</h2>
                <p>{latestEvent ? latestEvent.body : ''}</p>
            </div>
        </div>
    );
};

export default EventPopUp;