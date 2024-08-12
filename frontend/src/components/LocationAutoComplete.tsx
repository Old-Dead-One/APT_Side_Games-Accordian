import { Autocomplete, TextField, Typography } from '@mui/material';
import { Location } from './Types';

interface LocationAutoCompleteProps {
    locations: Location[];
    onSelect: (value: Location | null) => void;
}

const LocationAutoComplete: React.FC<LocationAutoCompleteProps> = ({ locations, onSelect }) => {
    return (
        <Autocomplete
            disablePortal
            id="location"
            options={locations}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <li {...props}>
                    <Typography variant="body1">{option.label}</Typography>
                </li>
            )}
            onChange={(_event, value) => onSelect(value)}
            sx={{ minWidth: '320px' }}
            renderInput={(params) => <TextField {...params} label="Find a Location" />}
        />
    );
}

export default LocationAutoComplete;
