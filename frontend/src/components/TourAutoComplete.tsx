import { Autocomplete, TextField, Box, Typography } from '@mui/material';
import { Tour } from './Types';

interface TourAutoCompleteProps {
    tours: Tour[];
    onSelect: (value: Tour | null) => void;
}

const TourAutoComplete: React.FC<TourAutoCompleteProps> = ({ tours, onSelect }) => {
    return (
        <Autocomplete
            disablePortal
            id="tour"
            options={tours}
            getOptionLabel={(option) => `${option.label} / ${option.year}`}
            renderOption={(props, option) => {
                const { key, ...restProps } = props;

                return (
                    <li {...restProps} key={key}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Typography variant="body1">{option.label}</Typography>
                            <Typography variant="body1" color="textSecondary">{option.year}</Typography>
                        </Box>
                    </li>
                );
            }
            }
            onChange={(_event, value) => onSelect(value)}
            sx={{ minWidth: '320px' }}
            renderInput={(params) => <TextField {...params} label="Find a Tour" />}
        />
    );
}

export default TourAutoComplete;
