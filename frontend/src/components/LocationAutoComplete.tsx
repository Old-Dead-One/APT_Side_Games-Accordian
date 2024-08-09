import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const LocationAutoComplete = () => {
    return (
        <Autocomplete
            disablePortal
            id="location"
            options={location}
            sx={{ width: 500 }}
            renderInput={(params) => <TextField {...params} label="Enter a Location" />}
        />
    );
}

export default LocationAutoComplete;

const location = [
    { label: 'Amatuer Players Tour', year: 1994 },
];
