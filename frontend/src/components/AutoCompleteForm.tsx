import React from 'react';
import { Box } from '@mui/material';
import TourAutoComplete from './TourAutoComplete';
import LocationAutoComplete from './LocationAutoComplete';
import EventAutoComplete from './EventAutoComplete';
import { Tour, Location, Event } from './Types';

// interface Location {
//     location_id: number;
//     label: string;
//     year: number;
//     tour_id: number;
// }

// interface Event {
//     event_id: number;
//     name: string;
//     course: string;
//     date: string;
//     chapter_name: string;
//     location_id: number;
// }

// interface Tour {
//     tour_id: number;
//     label: string;
//     year: number;
//     locations: Location[];
// }

interface AutoCompleteFormProps {
    tours: Tour[];
    locations: Location[];
    events: Event[];
    onSelectTour: (value: Tour | null) => void;
    onSelectLocation: (location: Location | null) => void;
    onSelectEvent: (event: Event | null) => void;
}

const AutoCompleteForm: React.FC<AutoCompleteFormProps> = ({
    tours,
    locations,
    events,
    onSelectTour,
    onSelectLocation,
    onSelectEvent
}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TourAutoComplete
                tours={tours}
                onSelect={onSelectTour}
            />
            <LocationAutoComplete
                locations={locations}
                onSelect={onSelectLocation}
            />
            <EventAutoComplete
                events={events}
                onSelect={onSelectEvent}
            />
        </Box>
    );
};

export default AutoCompleteForm;
