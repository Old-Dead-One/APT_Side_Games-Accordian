import React from 'react';
import { EventItem } from './Types';
import { Accordion, AccordionDetails, AccordionSummary, Typography, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
            <Accordion elevation={0} variant='outlined' sx={{
                paddingTop: .5,
                paddingBottom: .5,
            }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Selected Event Summary</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <fieldset>
                            <p><strong>Tour:</strong> {tourLabel}</p>
                            <p><strong>Location:</strong> {locationLabel}</p>
                            <p><strong>Event Name:</strong> {selectedEvent.name}</p>
                            <p><strong>Course:</strong> {selectedEvent.course}</p>
                            <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</p>
                        </fieldset>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default EventSummary;
