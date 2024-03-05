import React from 'react';
import './EventCard.css';

export interface EventCardProps {
    title: string;
    body: string;
    displayed: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ title, body }) => {
    return (
        <div className="event-card">
            <h2>{title}</h2>
            <p>{body}</p>
        </div>
    );
};

export default EventCard;