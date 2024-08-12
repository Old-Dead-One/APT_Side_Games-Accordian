export interface Tour {
    tour_id: number;
    label: string;
    year: number;
    locations: Location[];
}

export interface Location {
    location_id: number;
    label: string;
    tour_id: number;
    year: number;
}

export interface Event {
    event_id: number;
    name: string;
    course: string;
    date: string;
    tour_id: number;
    location_id: number;
}