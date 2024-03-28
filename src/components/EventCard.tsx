import React, {useEffect} from 'react';
import './EventCard.css';

export interface EventCardProps {
    title: string;
    body: string;
    displayed: boolean;
    completed: boolean;
    onClick?: () => void;
    checkCompletedBoolean?: any;
    onCompletedChange?: (completed: boolean) => void;
}

const EventCard: React.FC<EventCardProps> = ({ title, body, completed, onClick, checkCompletedBoolean, onCompletedChange }) => {

    useEffect(() => {
        if (checkCompletedBoolean == true) {
            console.log('Event Completed');
            onCompletedChange && onCompletedChange(true); //uses && to make sure the function exists before calling it
        }
    }, [checkCompletedBoolean]);

    return (
        <div className="event-card" onClick={onClick}>
            <div className="event-card-title">{title}</div>
            <div className="event-card-description">{body}</div>
            <div className="event-card-arrow">{'>'}</div>
        </div>
    );
};

export default EventCard;