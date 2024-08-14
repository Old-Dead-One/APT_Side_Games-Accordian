import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { LocationDetail } from './Types';

interface LocationAutoCompleteProps {
    locations: LocationDetail[];
    tour_Id: number | null;
    onSelectLocation: (location: LocationDetail | null) => void;
}

const LocationAutoComplete: React.FC<LocationAutoCompleteProps> = ({ locations, tour_Id, onSelectLocation }) => {

    const handleSelect = (_event: React.SyntheticEvent, value: LocationDetail | null) => {
        onSelectLocation(value);
    };

    return (
        <Autocomplete
            options={locations}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="Select Location" variant="outlined" />}
            onChange={handleSelect}
            disabled={!tour_Id} // Disable if no tour is selected
        />
    );
};

export default LocationAutoComplete;
