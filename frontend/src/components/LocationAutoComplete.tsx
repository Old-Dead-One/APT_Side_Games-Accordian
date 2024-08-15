import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { LocationDetail } from './Types';

interface LocationAutoCompleteProps {
    locations: LocationDetail[];
    tour_Id: number | null;
    value: LocationDetail | null;
    onSelect: (location: LocationDetail | null) => void;
}

const LocationAutoComplete: React.FC<LocationAutoCompleteProps> = ({ locations, tour_Id, value, onSelect }) => {
    const handleSelect = (_event: React.SyntheticEvent, newValue: LocationDetail | null) => {
        onSelect(newValue);
    };

    return (
        <Autocomplete
            options={locations}
            getOptionLabel={(option) => option.label}
            value={value}
            onChange={handleSelect}
            renderInput={(params) => <TextField {...params} label="Select Location" variant="outlined" />}
            fullWidth
            disabled={!tour_Id}
        />
    );
};

export default LocationAutoComplete;
