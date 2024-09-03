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

    return (
        <Box>
            <List>
                <ListItem disableGutters disablePadding><strong>Tour:&nbsp;</strong> {tourLabel}</ListItem>
                <ListItem disableGutters disablePadding><strong>Location:&nbsp;</strong> {locationLabel}</ListItem>
                <ListItem disableGutters disablePadding><strong>Event Name:&nbsp;</strong> {selectedEvent.name}</ListItem>
                <ListItem disableGutters disablePadding><strong>Course:&nbsp;</strong> {selectedEvent.course}</ListItem>
                <ListItem disableGutters disablePadding><strong>Date:&nbsp;</strong> {new Date(selectedEvent.date).toLocaleDateString()}</ListItem>
            </List>
        </Box>
    );
};

export default EventSummary;
