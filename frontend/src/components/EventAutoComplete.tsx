import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Event, EventItem } from './Types';

interface EventAutoCompleteProps {
    events: Event[];
    tourId: number | null;
    locationId: number | null;
    onSelect: (event: EventItem | null) => void;
}

const EventAutoComplete: React.FC<EventAutoCompleteProps> = ({ events, tourId, locationId, onSelect }) => {
    const filteredEvents = events
        .filter(event => event.tour_id === tourId)
        .flatMap(event => event.events)
        .filter(eventDetail => eventDetail.location_id === locationId)
        .flatMap(eventDetail => eventDetail.events);

    const handleSelect = (_event: React.SyntheticEvent, value: EventItem | null) => {
        onSelect(value);
    };

    return (
        <Autocomplete
            options={filteredEvents}
            getOptionLabel={(option) => option.name}
            onChange={handleSelect}
            renderInput={(params) => <TextField {...params} label="Select Event" variant="outlined" />}
            fullWidth
        />
    );
};

export default EventAutoComplete;
