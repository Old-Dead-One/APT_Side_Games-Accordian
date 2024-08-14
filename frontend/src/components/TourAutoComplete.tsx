import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Tour } from './Types';

interface TourAutoCompleteProps {
    tours: Tour[];
    onSelect: (tourId: number | null) => void;
}

const TourAutoComplete: React.FC<TourAutoCompleteProps> = ({ tours, onSelect }) => {
    const handleSelect = (_event: React.SyntheticEvent, value: Tour | null) => {
        onSelect(value ? value.tour_id : null);
    };

    return (
        <Autocomplete
            options={tours}
            getOptionLabel={(option) => `${option.label} (${option.year})`}
            onChange={handleSelect}
            renderInput={(params) => <TextField {...params} label="Select Tour" variant="outlined" />}
            fullWidth
        />
    );
};

export default TourAutoComplete;
