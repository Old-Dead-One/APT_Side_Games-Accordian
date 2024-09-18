import React from "react";
import { EventItem } from "./Types";
import { Accordion, TextField, List, Box, ListItem } from "@mui/material";

interface EventSummaryProps {
    selectedEvent: EventItem | null;
    tourLabel: string | null;
    locationLabel: string | null;
}

const EventSummary: React.FC<EventSummaryProps> = ({ selectedEvent, tourLabel, locationLabel }) => {
    if (!selectedEvent) {
        return (
            <Accordion>
                <TextField
                    label="No event selected"
                    disabled
                    fullWidth
                    variant="outlined"
                />
            </Accordion>
        );
    }

    const eventDate = new Date(selectedEvent.date);
    // Set the closing time to 10:00 PM the day before the event
    const closingDate = new Date(eventDate);
    closingDate.setDate(eventDate.getDate());
    closingDate.setHours(22, 0, 0, 0); // 10:00 PM

    const now = new Date();
    const timeRemaining = closingDate.getTime() - now.getTime();

    let daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    let hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    // Handle the case when the entry time has already passed
    const entryStatus = timeRemaining < 0 ? "Closed" : `${daysRemaining} days ${hoursRemaining} hours`;

    return (
        <Box>
            <List>
                <ListItem disableGutters disablePadding><strong>Tour:&nbsp;</strong> {tourLabel}</ListItem>
                <ListItem disableGutters disablePadding><strong>Location:&nbsp;</strong> {locationLabel}</ListItem>
                <ListItem disableGutters disablePadding><strong>Event Name:&nbsp;</strong> {selectedEvent.name}</ListItem>
                <ListItem disableGutters disablePadding><strong>Course:&nbsp;</strong> {selectedEvent.course}</ListItem>
                <ListItem disableGutters disablePadding><strong>Date:&nbsp;</strong> {selectedEvent.date}</ListItem>
                <ListItem disableGutters disablePadding>
                    <strong>Closes in:&nbsp;</strong> {entryStatus}
                </ListItem>
            </List>
        </Box>
    );
};

export default EventSummary;
