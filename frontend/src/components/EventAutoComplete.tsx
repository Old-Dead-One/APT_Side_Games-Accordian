import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const EventAutoComplete = () => {
    return (
        <Autocomplete
            disablePortal
            id="event"
            options={events}
            sx={{ width: 500 }}
            renderInput={(params) => <TextField {...params} label="Enter an Event" />}
        />
    );
}

export default EventAutoComplete;

const events = [
    { label: 'Amatuer Players Tour', year: 1994 },
];
