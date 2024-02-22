import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {EventCardProps}  from '../components/EventCard';

interface EventLogContextType {
  eventLog: EventCardProps[];
  addEvent: (event: EventCardProps) => void;
  hasNewEvent: boolean;
  setHasNewEvent: (hasNewEvent: boolean) => void;
}

const EventLogContext = createContext<EventLogContextType | undefined>(undefined);

interface EventLogProviderProps {
  children: ReactNode;
}

const EventLogProvider: React.FC<EventLogProviderProps> = ({ children }) => {
  // Load state from Local Storage
  const savedState = JSON.parse(localStorage.getItem('eventState') || '[]');
  const savedHasNewEvent = JSON.parse(localStorage.getItem('hasNewEvent') || 'false');
  
  const [eventLog, setEventLog] = useState<EventCardProps[]>(savedState);
  const [hasNewEvent, setHasNewEvent] = useState<boolean>(savedHasNewEvent);
  
  const addEvent = (event: EventCardProps) => {
    setEventLog(prevLog => [...prevLog, event]);
    setHasNewEvent(true);
  };

  // Save state to Local Storage
  useEffect(() => {
    localStorage.setItem('eventState', JSON.stringify(eventLog));
    localStorage.setItem('hasNewEvent', JSON.stringify(hasNewEvent));
  }, [eventLog, hasNewEvent]);

  return (
    <EventLogContext.Provider value={{ eventLog, addEvent, hasNewEvent, setHasNewEvent }}>
      {children}
    </EventLogContext.Provider>
  );
};

const useEventLogContext = (): EventLogContextType => {
  const eventLogContext = useContext(EventLogContext);
  if (!eventLogContext) {
    throw new Error('useEventLogContext must be used within an EventLogProvider');
  }
  return eventLogContext;
};

export { EventLogContext, EventLogProvider, useEventLogContext };