import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import AutoCompleteForm from "../components/AutoCompleteForm";
import { Tour, Location, LocationDetail, EventItem, SideGames } from "../components/Types";
import { Alert } from "@mui/material";

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
    const [expanded, setExpanded] = useState<string | false>("tourpanel");
    const [sideGamesRows, setSideGamesRows] = useState<SideGames[]>([]);
    const [net, setNet] = useState<string | null>(null);
    const [division, setDivision] = useState<string | null>(null);
    const [superSkins, setSuperSkins] = useState<boolean>(false);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const { addToCart, isEventInCart } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [toursResponse, locationsResponse, eventsResponse, sideGamesResponse] = await Promise.all([
                    fetch("/data/tours.json"),
                    fetch("/data/locations.json"),
                    fetch("/data/events.json"),
                    fetch("/data/sidegames.json")
                ]);

                const toursData: Tour[] = await toursResponse.json();
                const locationsData: Location[] = await locationsResponse.json();
                const eventsData: EventItem[] = await eventsResponse.json();
                const sideGamesData: SideGames[] = await sideGamesResponse.json();

                setTours(toursData);
                setLocations(locationsData);
                setEvents(eventsData);
                setSideGamesRows(sideGamesData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const filteredLocationDetails: LocationDetail[] = selectedTourId
        ? locations.find(location => location.tour_id === selectedTourId)?.locations || []
        : [];

    const handleSelectTour = (tourId: number | null, selectedTour: Tour | null) => {
        setSelectedTourId(tourId);
        setTourValue(selectedTour);
        setSelectedLocationId(null);
        setLocationValue(null);
        setSelectedEvent(null);
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
        setExpanded("eventsummarypanel");
    };

    const handleExpanded = (panel: string | false) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const updateSideGamesData = (newNet: string | null, newDivision: string | null, newSuperSkins: boolean) => {
        const updatedRows = sideGamesRows.map(row => ({
            ...row,
            selected: (row.key === newNet) || (row.key === newDivision) || (row.key === "Super Skins" && newSuperSkins)
        }));

        const updatedTotalCost = updatedRows.reduce((acc: number, row: SideGames) => {
            return acc + (row.selected ? row.value : 0);
        }, 0);

        setSideGamesRows(updatedRows);
        setTotalCost(updatedTotalCost);
    };

    const handleNetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const newNet = value === net ? null : value;
        setNet(newNet);
        updateSideGamesData(newNet, division, superSkins);
    };

    const handleDivisionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const newDivision = value === division ? null : value;
        setDivision(newDivision);
        updateSideGamesData(net, newDivision, superSkins);
    };

    const handleSuperSkinsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;
        const newSuperSkins = value === superSkins ? false : value;
        setSuperSkins(newSuperSkins);
        updateSideGamesData(net, division, newSuperSkins);
    };

    const handleAddToCart = () => {
        if (!selectedEvent) {
            setErrorMessage("Please select an event");
            return;
        }

        if (isEventInCart && isEventInCart(selectedEvent.event_id)) {
            setErrorMessage("Event is already in cart");
            return;
        }

        if (!net && !division && !superSkins) {
            setErrorMessage("Please select a side game");
            return;
        }

        setErrorMessage(null);
        setSuccessMessage("Event added to cart");

        const eventSummary = {
            selectedEvent,
            tourLabel: tours.find(tour => tour.tour_id === selectedTourId)?.label || null,
            locationLabel: filteredLocationDetails.find(loc => loc.location_id === selectedLocationId)?.label || null,
        };

        const sideGamesData = {
            net,
            division,
            superSkins,
            rows: sideGamesRows.map(row => ({
                name: row.name,
                cost: row.value,
                selected: (row.key === "SuperSkins" && superSkins) || (row.key === net || row.key === division),
            })),
            totalCost,
        };

        addToCart(eventSummary, sideGamesData);

        setTimeout(() => {
            setSuccessMessage(null);
        }, 3000);
    };

    return (
        <>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
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
                expanded={expanded}
                onAccordionChange={handleExpanded}
                sideGamesRows={sideGamesRows}
                net={net}
                division={division}
                superSkins={superSkins}
                totalCost={totalCost}
                onNetChange={handleNetChange}
                onDivisionChange={handleDivisionChange}
                onSuperSkinsChange={handleSuperSkinsChange}
                onAddToCart={handleAddToCart}
            />
        </>
    );
};

export default Home;
