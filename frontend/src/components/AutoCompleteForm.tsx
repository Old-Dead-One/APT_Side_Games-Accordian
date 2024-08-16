import React from 'react';
import TourAutoComplete from './TourAutoComplete';
import LocationAutoComplete from './LocationAutoComplete';
import EventAutoComplete from './EventAutoComplete';
import EventSummary from './EventSummary';
import { Tour, LocationDetail, EventItem, LocationEvent } from './Types';
import { AccordionSummary, AccordionDetails, Box, Typography } from '@mui/material';
import { Accordion } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface AutoCompleteFormProps {
    tours: Tour[];
    locations: LocationDetail[];
    events: LocationEvent[];
    selectedTourId: number | null;
    selectedLocationId: number | null;
    selectedEvent: EventItem | null;
    tourValue: Tour | null;
    locationValue: LocationDetail | null;
    eventValue: EventItem | null;
    onSelectTour: (tourId: number | null, selectedTour: Tour | null) => void;
    onSelectLocation: (location: LocationDetail | null) => void;
    onSelectEvent: (event: EventItem | null) => void;
}

const AutoCompleteForm: React.FC<AutoCompleteFormProps> = ({
    tours,
    locations,
    events,
    selectedTourId,
    selectedLocationId,
    selectedEvent,
    tourValue,
    locationValue,
    eventValue,
    onSelectTour,
    onSelectLocation,
    onSelectEvent,
}) => {
    const selectedTourLabel = tours.find(tour => tour.tour_id === selectedTourId)?.label || null;
    const selectedLocationLabel = selectedLocationId
        ? locations.find(loc => loc.location_id === selectedLocationId)?.label || null
        : null;

    return (
        <>
            <Accordion
                defaultExpanded
                elevation={0}
                variant='outlined'
                sx={{
                    paddingTop: .5,
                    paddingBottom: .5,
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Find an Event</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box>
                        <Box marginBottom={1.5}>
                            <TourAutoComplete
                                tours={tours}
                                value={tourValue}
                                onSelect={onSelectTour} />
                        </Box>
                        <Box
                            marginBottom={1.5}>
                            <LocationAutoComplete
                                locations={locations}
                                tour_Id={selectedTourId}
                                value={locationValue}
                                onSelect={onSelectLocation} />
                        </Box>
                        <Box>
                            <EventAutoComplete
                                events={events}
                                tourId={selectedTourId}
                                locationId={selectedLocationId}
                                value={eventValue}
                                onSelect={onSelectEvent} />
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion
                elevation={0}
                variant='outlined'
                sx={{
                    paddingTop: .5,
                    paddingBottom: .5,
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Selected Event Summary</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EventSummary
                        selectedEvent={selectedEvent}
                        tourLabel={selectedTourLabel}
                        locationLabel={selectedLocationLabel} />
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default AutoCompleteForm;
