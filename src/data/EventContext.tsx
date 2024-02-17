import React, { createContext, useContext, useState, ReactNode } from 'react';
import {EventCardProps}  from '../components/EventCard';

interface EventLogContextType {
  eventLog: EventCardProps[];
  addEvent: (event: EventCardProps) => void;
}

const EventLogContext = createContext<EventLogContextType | undefined>(undefined);

interface EventLogProviderProps {
  children: ReactNode;
}

const EventLogProvider: React.FC<EventLogProviderProps> = ({ children }) => {
  const [eventLog, setEventLog] = useState<EventCardProps[]>([]);

  const addEvent = (event: EventCardProps) => {
    setEventLog(prevLog => [...prevLog, event]);
  };

  return (
    <EventLogContext.Provider value={{ eventLog, addEvent }}>
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

export { EventLogContext, EventLogProvider, useEventLogContext};