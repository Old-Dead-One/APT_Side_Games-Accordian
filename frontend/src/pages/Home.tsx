import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import AutoCompleteForm from '../components/AutoCompleteForm';
import { Tour, Location, Event } from '../components/Types';

const Home = () => {
    const theme = useTheme();
    const [tours, setTours] = useState<Tour[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tourResponse, locationResponse, eventResponse] = await Promise.all([
                    fetch('/tours.json'),
                    fetch('/locations.json'),
                    fetch('/events.json')
                ]);
                const toursData = await tourResponse.json();
                const locationsData = await locationResponse.json();
                const eventsData = await eventResponse.json();

                const flattenedLocations = locationsData.flatMap((tour: Tour) => tour.locations);

                setTours(toursData);
                setLocations(flattenedLocations);
                setEvents(eventsData.events);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredLocations = selectedTour
        ? locations.filter(location => location.tour_id === selectedTour.tour_id)  // Corrected to use tour_id
        : [];

    const filteredEvents = selectedLocation
        ? events.filter(event => event.location_id === selectedLocation.location_id)
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
                events={filteredEvents}
                onSelectTour={(tour) => {
                    setSelectedTour(tour);
                    setSelectedLocation(null); // Reset location and event when a new tour is selected
                    setSelectedEvent(null);
                    console.log(tour);
                }}
                onSelectLocation={(location) => {
                    setSelectedLocation(location);
                    setSelectedEvent(null); // Reset event when a new location is selected
                    console.log(location)
                }}
                onSelectEvent={(event) => {
                    setSelectedEvent(event); // Update selected event
                    console.log(event);
                }}
            />

            {/* Display selected event details */}
            {selectedEvent && (
                <Box mt={2}>
                    <Typography variant="h6">Selected Event Details:</Typography>
                    <Typography>Name: {selectedEvent.name}</Typography>
                    <Typography>Course: {selectedEvent.course}</Typography>
                    <Typography>Date: {selectedEvent.date}</Typography>
                    <Typography>Chapter: {selectedEvent.tour_id}</Typography>
                </Box>
            )}
        </Box>
    );
}

export default Home;
