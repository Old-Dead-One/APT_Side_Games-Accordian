import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const EventAutoComplete = () => {
    return (
        <Autocomplete
            disablePortal
            id="event"
            options={events}
            sx={{ minWidth: '320px auto' }}
            renderInput={(params) => <TextField {...params} label="Find an Event" />}
        />
    );
}

export default EventAutoComplete;

const events = [
    { label: 'Amatuer Players Tour', year: 1994 },
];
