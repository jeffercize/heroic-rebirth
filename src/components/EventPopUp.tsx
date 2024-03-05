import React, {useEffect, useState, useRef} from 'react';
import './EventPopUp.css';
import { useEventLogContext } from '../data/EventContext';

export const EventPopUp: React.FC = () => {
    const { eventLog, hasNewEvent, setHasNewEvent } = useEventLogContext();
    const [eventQueue, setEventQueue] = useState(eventLog);
    const textBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (hasNewEvent) {
        const newEvents = eventLog.filter(event => !event.displayed);
        setEventQueue(prevQueue => [...prevQueue, ...newEvents]);
      }
    }, [hasNewEvent, eventLog]);

    const closePopup = () => {
      setEventQueue(prevQueue => prevQueue.slice(1));
    };

    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (textBoxRef.current && !textBoxRef.current.contains(event.target as Node)) {
        closePopup();
      }
    };

    const latestEvent = eventQueue[0];

    return (
        <div className={`overlay ${latestEvent ? 'visible' : ''}`} onClick={handleClickOutside}>
            
            <div className="text-box" ref={textBoxRef}>
                <button className="close-button" onClick={closePopup}>X</button>
                <h2>{latestEvent ? latestEvent.title: ''}</h2>
                <p>{latestEvent ? latestEvent.body : ''}</p>
            </div>
        </div>
    );
};

export default EventPopUp;