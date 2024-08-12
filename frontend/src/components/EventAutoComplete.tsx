import { Autocomplete, TextField, Box, Typography } from '@mui/material';
import { Event } from './Types';

interface EventAutoCompleteProps {
    events: Event[];
    onSelect: (value: Event | null) => void;
}

const EventAutoComplete: React.FC<EventAutoCompleteProps> = ({ events, onSelect }) => {
    return (
        <Autocomplete
            disablePortal
            id="event"
            options={events}
            getOptionLabel={(option) => `${option.name} / ${option.course} / ${option.tour_id} / ${option.date}`}
            renderOption={(props, option) => (
                <li {...props}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body1"><strong>{option.name}</strong></Typography>
                            <Typography variant="body1">{option.date}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2">{option.course}</Typography>
                            <Typography variant="body2" color="textSecondary">{option.tour_id}</Typography>
                        </Box>
                    </Box>
                </li>
            )}
            onChange={(_event, value) => onSelect(value)}
            sx={{ minWidth: '320px' }}
            renderInput={(params) => <TextField {...params} label="Select Event" />}
        />
    );
}

export default EventAutoComplete;
