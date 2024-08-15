// import React, { useState, useEffect } from 'react';
// import TourAutoComplete from './TourAutoComplete';
// import LocationAutoComplete from './LocationAutoComplete';
// import EventAutoComplete from './EventAutoComplete';
// import EventSummary from './EventSummary';
// import { Tour, Location, Event, LocationDetail, EventItem } from './Types';

// const ParentComponent: React.FC = () => {
//     const [tours, setTours] = useState<Tour[]>([]);
//     const [locations, setLocations] = useState<Location[]>([]);
//     const [events, setEvents] = useState<Event[]>([]);
//     const [selectedTourId, setSelectedTourId] = useState<number | null>(null);
//     const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
//     const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

//     const [tourValue, setTourValue] = useState<Tour | null>(null);
//     const [locationValue, setLocationValue] = useState<LocationDetail | null>(null);
//     const [eventValue, setEventValue] = useState<EventItem | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const toursResponse = await fetch('/data/tours.json');
//                 const toursData: Tour[] = await toursResponse.json();
//                 setTours(toursData);

//                 const locationsResponse = await fetch('/data/locations.json');
//                 const locationsData: Location[] = await locationsResponse.json();
//                 setLocations(locationsData);

//                 const eventsResponse = await fetch('/data/events.json');
//                 const eventsData: Event[] = await eventsResponse.json();
//                 setEvents(eventsData);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     const filteredLocationDetails: LocationDetail[] = selectedTourId
//         ? locations
//             .filter(location => location.tour_id === selectedTourId)
//             .flatMap(location => location.locations)
//         : [];

//     const selectedTourLabel = tours.find(tour => tour.tour_id === selectedTourId)?.label || null;

//     const selectedLocationLabel = selectedTourId && selectedLocationId
//         ? locations
//             .find(location => location.tour_id === selectedTourId)
//             ?.locations.find(loc => loc.location_id === selectedLocationId)?.label || null
//         : null;

//     const handleSelectTour = (tourId: number | null, selectedTour: Tour | null) => {
//         setSelectedTourId(tourId);
//         setTourValue(selectedTour);

//         setSelectedLocationId(null);
//         setSelectedEvent(null);
//         setLocationValue(null);
//         setEventValue(null);
//     };

//     const handleSelectLocation = (location: LocationDetail | null) => {
//         setSelectedLocationId(location ? location.location_id : null);
//         setLocationValue(location);
//         setSelectedEvent(null);
//         setEventValue(null);
//     };

//     const handleSelectEvent = (event: EventItem | null) => {
//         if (event && selectedTourId && selectedLocationId) {
//             const selectedTourEvents = events.find(e => e.tour_id === selectedTourId);
//             const selectedLocationEvents = selectedTourEvents?.events.find(le => le.location_id === selectedLocationId);
//             const foundEvent = selectedLocationEvents?.events.find(ev => ev.event_id === event.event_id);
//             setSelectedEvent(foundEvent || null);
//             setEventValue(foundEvent || null);
//         } else {
//             setSelectedEvent(null);
//             setEventValue(null);
//         }
//     };

//     return (
//         <div>
//             <TourAutoComplete
//                 tours={tours}
//                 value={tourValue}
//                 onSelect={(tourID: number | null, tour: Tour | null) => handleSelectTour(tourID, tour)}
//             />
//             <br />
//             <LocationAutoComplete
//                 locations={filteredLocationDetails}
//                 tour_Id={selectedTourId}
//                 value={locationValue}
//                 onSelect={handleSelectLocation}
//             />
//             <br />
//             <EventAutoComplete
//                 events={events}
//                 tourId={selectedTourId}
//                 locationId={selectedLocationId}
//                 value={eventValue}
//                 onSelect={handleSelectEvent}
//             />
//             <br />
//             <EventSummary
//                 selectedEvent={selectedEvent}
//                 tourLabel={selectedTourLabel}
//                 locationLabel={selectedLocationLabel}
//             />
//         </div>
//     );
// };

// export default ParentComponent;

import React from 'react';
import TourAutoComplete from './TourAutoComplete';
import LocationAutoComplete from './LocationAutoComplete';
import EventAutoComplete from './EventAutoComplete';
import EventSummary from './EventSummary';
import { Tour, LocationDetail, EventItem, LocationEvent } from './Types';

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
        <div>
            <TourAutoComplete
                tours={tours}
                value={tourValue}
                onSelect={onSelectTour}
            />
            <br />
            <LocationAutoComplete
                locations={locations}
                tour_Id={selectedTourId}
                value={locationValue}
                onSelect={onSelectLocation}
            />
            <br />
            <EventAutoComplete
                events={events}
                tourId={selectedTourId}
                locationId={selectedLocationId}
                value={eventValue}
                onSelect={onSelectEvent}
            />
            <br />
            <EventSummary
                selectedEvent={selectedEvent}
                tourLabel={selectedTourLabel}
                locationLabel={selectedLocationLabel}
            />
        </div>
    );
};

export default AutoCompleteForm;
