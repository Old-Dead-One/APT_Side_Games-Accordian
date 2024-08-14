import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import AutoCompleteForm from '../components/AutoCompleteForm';
import { Tour, Location, Event, LocationDetail } from '../components/Types';

const Home = () => {
    const theme = useTheme();
    const [tours, setTours] = useState<Tour[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<LocationDetail | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tourResponse, locationResponse, eventResponse] = await Promise.all([
                    fetch('data/tours.json'),
                    fetch('data/locations.json'),
                    fetch('data/events.json')
                ]);
                const toursData = await tourResponse.json();
                const locationsData = await locationResponse.json();
                const eventsData = await eventResponse.json();

                setTours(toursData);
                setLocations(locationsData);
                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredLocations: LocationDetail[] = selectedTour
        ? locations.find(location => location.tour_id === selectedTour.tour_id)?.locations || []
        : [];

    return (
        <Box
            sx={{
                position: 'fixed',
                top: '60px',
                left: '50%',
                transform: 'translateX(-50%)',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? '#dcddde' : '#000000',
                borderRadius: '10px',
                boxSizing: 'border-box',
                width: '75%',
                minWidth: '320px',
                maxWidth: 'auto',
                height: 'auto',
                p: 2,
                marginTop: 2,
                overflow: 'auto',
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
            }}
        >
            <Typography variant="h6" align="center">Find Side Games:</Typography>

            <AutoCompleteForm
                tours={tours}
                locations={filteredLocations}
                events={events}
                onSelectTour={setSelectedTour}
                onSelectLocation={setSelectedLocation}
                onSelectEvent={setSelectedEvent}
                selectedTour={selectedTour}
                selectedLocation={selectedLocation}
            />

            {selectedEvent && (
                <Box mt={2}>
                    <Typography variant="h6">Selected Event Details:</Typography>
                    <Typography>Name: {selectedEvent.name}</Typography>
                    <Typography>Course: {selectedEvent.course}</Typography>
                    <Typography>Date: {selectedEvent.date}</Typography>
                    <Typography>Tour ID: {selectedEvent.tour_id}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default Home;
