import React from 'react';
import './EventCard.css';

export interface EventCardProps {
    title: string;
    body: string;
    displayed: boolean;
    completed: boolean;
    onClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ title, body, onClick }) => {



    return (
        <div className="event-card" onClick={onClick}>
            <div className="event-card-title">{title}</div>
            <div className="event-card-description">{body}</div>
            <div className="event-card-arrow">{'>'}</div>
        </div>
    );
};

export default EventCard;