import React, {useState, useCallback} from 'react';
import './EventList.css';
import { VisibilityProvider, useVisibilityContext } from '../data/VisibilityContext';
import { useEventLogContext } from '../data/EventContext'; // adjust the path as needed
import EventCard from '../components/EventCard'; // adjust the path as needed

const EventLog: React.FC = () => {
  const { eventLog, setDisplayEventIndex } = useEventLogContext();


  const onClick = (eventIndex: number) => {
    setDisplayEventIndex(eventIndex);
  }

  const handleCompletedChange = useCallback((index: number, completed: boolean) => {
    ongoingEvents[index].completed = completed;
    completedEvents.push(ongoingEvents[index]);
    ongoingEvents.splice(index, 1);
  }, []);
  
  const completedEvents = eventLog.filter(event => event.completed);
  const ongoingEvents = eventLog.filter(event => !event.completed);

  return (
    <>
      <div className="event-section">
        <h2 className="event-list-title">Events</h2>

        <div className="event-title">Ongoing:</div>
        <div className="event-list">
        {ongoingEvents.length > 0 ? (
          [...ongoingEvents].reverse().map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              body={event.body}
              displayed={event.displayed}
              completed={event.completed}
              onClick={() => onClick(eventLog.indexOf(event))}
              checkCompletedBoolean={event.checkCompletedBoolean}
              onCompletedChange={(completed) => handleCompletedChange(eventLog.indexOf(event), completed)}
            />
          ))
        ) : (
        <p>No ongoing events.</p>
        )}
        </div>

        <div className="event-title">Completed:</div>
        <div className="event-list">
          {[...completedEvents].reverse().map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              body={event.body}
              displayed={event.displayed}
              completed={event.completed}
              onClick={() => onClick(eventLog.indexOf(event))}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default EventLog;