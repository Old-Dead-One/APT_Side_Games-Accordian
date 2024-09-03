import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Tour } from "./Types";

interface TourAutoCompleteProps {
    tours: Tour[];
    value: Tour | null;
    onSelect: (tour_id: number | null, tour: Tour | null) => void;
}
const TourAutoComplete: React.FC<TourAutoCompleteProps> = ({ tours, value, onSelect }) => {
    return (
        <Autocomplete
            options={tours}
            getOptionLabel={(option) => option.label}
            value={value}
            onChange={(_event, newValue) => onSelect(newValue ? newValue.tour_id : null, newValue)}
            renderInput={(params) => <TextField {...params} label="Select Tour" />}
            fullWidth
        />
    );
};

export default TourAutoComplete;