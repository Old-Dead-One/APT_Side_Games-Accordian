// Type definitions for the components

// Tour interface to represent tour data
export interface Tour {
    tour_id: number;
    label: string;
    year: number;
}

// Location interface to represent location data
export interface Location {
    tour_id: number;
    tour_label: string;
    year: number;
    locations: LocationDetail[];
}

// LocationDetail interface to represent detailed location data
export interface LocationDetail {
    location_id: number;
    label: string;
    year: number;
}

// Event interface to represent event data
export interface Event {
    tour_id: number;
    tour_label: string;
    year: number;
    events: LocationEvent[];
}

// LocationEvent interface to represent events for a specific location
export interface LocationEvent {
    location_id: number;
    events: EventItem[];
}

// EventItem interface to represent individual event details
export interface EventItem {
    event_id: number;
    name: string;
    course: string;
    date: string;
}

export interface AutoCompleteFormProps {
    tours: Tour[];
    locations: Location[];
    events: Event[];
    onSelectTour: (tourId: number | null) => void;
    onSelectLocation: (locationId: number | null) => void;
    onSelectEvent: (event: EventItem | null) => void;
    selectedTour: Tour | null;
    selectedLocation: LocationDetail | null;
}
