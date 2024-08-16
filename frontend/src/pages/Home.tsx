import React, { useState, useEffect } from 'react';
import AutoCompleteForm from '../components/AutoCompleteForm';
import { Tour, Location, LocationDetail, EventItem } from '../components/Types';

const Home: React.FC = () => {
    const [tours, setTours] = useState<Tour[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [events, setEvents] = useState<EventItem[]>([]);
    const [selectedTourId, setSelectedTourId] = useState<number | null>(null);
    const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
    const [tourValue, setTourValue] = useState<Tour | null>(null);
    const [locationValue, setLocationValue] = useState<LocationDetail | null>(null);
    const [eventValue, setEventValue] = useState<EventItem | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const toursResponse = await fetch('/data/tours.json');
                const toursData: Tour[] = await toursResponse.json();
                setTours(toursData);

                const locationsResponse = await fetch('/data/locations.json');
                const locationsData: Location[] = await locationsResponse.json();
                setLocations(locationsData);

                const eventsResponse = await fetch('/data/events.json');
                const eventsData: EventItem[] = await eventsResponse.json();
                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredLocationDetails: LocationDetail[] = selectedTourId
        ? locations
            .filter(location => location.tour_id === selectedTourId)
            .flatMap(location => location.locations)
        : [];

    const handleSelectTour = (tourId: number | null, selectedTour: Tour | null) => {
        setSelectedTourId(tourId);
        setTourValue(selectedTour);

        setSelectedLocationId(null);
        setSelectedEvent(null);
        setLocationValue(null);
        setEventValue(null);
    };

    const handleSelectLocation = (location: LocationDetail | null) => {
        setSelectedLocationId(location ? location.location_id : null);
        setLocationValue(location);
        setSelectedEvent(null);
        setEventValue(null);
    };

    const handleSelectEvent = (event: EventItem | null) => {
        setSelectedEvent(event);
        setEventValue(event);
    };

    return (
        <AutoCompleteForm
            tours={tours}
            locations={filteredLocationDetails}
            events={events}
            selectedTourId={selectedTourId}
            selectedLocationId={selectedLocationId}
            selectedEvent={selectedEvent}
            tourValue={tourValue}
            locationValue={locationValue}
            eventValue={eventValue}
            onSelectTour={handleSelectTour}
            onSelectLocation={handleSelectLocation}
            onSelectEvent={handleSelectEvent}
        />
    );
};

export default Home;
