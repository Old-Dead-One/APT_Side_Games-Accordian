import React from 'react';
import { EventItem } from './Types';
import { Accordion, Typography, TextField } from '@mui/material';
import SideGamesForm from './SideGamesForm';

interface EventSummaryProps {
    selectedEvent: EventItem | null;
    tourLabel: string | null;
    locationLabel: string | null;
}

const EventSummary: React.FC<EventSummaryProps> = ({ selectedEvent, tourLabel, locationLabel }) => {
    if (!selectedEvent) {
        return <div>
            <Accordion>
                <Typography>
                    <TextField
                        label="No event selected"
                        disabled
                        fullWidth
                        variant='outlined'
                    />
                </Typography>
            </Accordion>
        </div>;
    }

    return (
        <div>
            <Typography>
                <fieldset
                    style={{
                        border: '1px solid #ccc',
                        padding: '1rem',
                        borderRadius: '5px',
                    }}
                >
                    <p><strong>Tour:</strong> {tourLabel}</p>
                    <p><strong>Location:</strong> {locationLabel}</p>
                    <p><strong>Event Name:</strong> {selectedEvent.name}</p>
                    <p><strong>Course:</strong> {selectedEvent.course}</p>
                    <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</p>
                    <SideGamesForm />
                </fieldset>
            </Typography>
        </div>
    );
};

export default EventSummary;
