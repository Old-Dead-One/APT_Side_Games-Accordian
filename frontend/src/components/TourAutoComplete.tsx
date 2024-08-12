import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const TourAutoComplete = () => {
    return (
        <Autocomplete
            disablePortal
            id="tour"
            options={tour}
            sx={{ minWidth: '320px auto' }}
            renderInput={(params) => <TextField {...params} label="Find a Tour" />}
        />
    );
}

export default TourAutoComplete;

const tour = [
    { label: 'Amatuer Players Tour', year: 1994 },
];
