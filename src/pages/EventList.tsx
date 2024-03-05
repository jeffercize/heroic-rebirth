import React, {useState} from 'react';
import './EventList.css';
import { VisibilityProvider, useVisibilityContext } from '../data/VisibilityContext';
import { useEventLogContext } from '../data/EventContext'; // adjust the path as needed
import EventCard from '../components/EventCard'; // adjust the path as needed

const EventLog: React.FC = () => {
  const { eventLog } = useEventLogContext();

  return (
    <div className="event-section">
        <h2 className="event-list-title">Events</h2>
        <div className="event-list">
            {[...eventLog].reverse().map((event, index) => (
                <EventCard key={index} title={event.title} body={event.body} displayed={event.displayed} />
            ))}
        </div>
    </div>
  );
};

export default EventLog;