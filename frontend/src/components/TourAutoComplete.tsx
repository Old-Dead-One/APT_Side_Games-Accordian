import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const TourAutoComplete = () => {
    return (
        <Autocomplete
            disablePortal
            id="tour"
            options={tour}
            sx={{ width: 500 }}
            renderInput={(params) => <TextField {...params} label="Enter a Tour" />}
        />
    );
}

export default TourAutoComplete;

const tour = [
    { label: 'Amatuer Players Tour', year: 1994 },
];
