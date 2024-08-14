import React, { useState, useEffect } from 'react';
import TourAutoComplete from './TourAutoComplete';
import LocationAutoComplete from './LocationAutoComplete';
import EventAutoComplete from './EventAutoComplete';
import { Tour, Location, Event, LocationDetail } from './Types';

const ParentComponent: React.FC = () => {
    const [tours, setTours] = useState<Tour[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedTourId, setSelectedTourId] = useState<number | null>(null);
    const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);

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
                const eventsData: Event[] = await eventsResponse.json();
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

    return (
        <div>
            <TourAutoComplete tours={tours} onSelect={setSelectedTourId} />
            <br />
            <LocationAutoComplete
                locations={filteredLocationDetails}
                tour_Id={selectedTourId}
                onSelectLocation={(location: LocationDetail | null) => setSelectedLocationId(location ? location.location_id : null)}
            />
            <br />
            <EventAutoComplete
                events={events}
                tourId={selectedTourId}
                locationId={selectedLocationId}
                onSelect={(event) => console.log(event)}
            />
        </div>
    );
};

export default ParentComponent;
