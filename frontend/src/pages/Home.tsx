import { useTheme } from '@mui/material/styles'; // Ensure you import useTheme
import { Box, Typography } from '@mui/material';
import TourAutoComplete from "../components/TourAutoComplete";
import LocationAutoComplete from "../components/LocationAutoComplete";
import EventAutoComplete from "../components/EventAutoComplete";
import SideGamesForm from "../components/SideGamesForm";

const Home = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'fixed',
                top: '60px',
                left: '50%',
                transform: 'translateX(-50%)',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? '#dcddde' : '#000000',
                borderRadius: '10px',
                boxSizing: 'border-box',
                minWidth: '400px',
                maxWidth: 'auto',
                height: 'auto',
                width: 'auto',
                p: 2,
                m: 2,
                overflow: 'auto',
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
            }}
        >
            <Typography variant="h6" align="center">Find Side Games:</Typography>

            <TourAutoComplete />
            <br />
            <LocationAutoComplete />
            <br />
            <EventAutoComplete />
            <br />
            <SideGamesForm />
        </Box>
    );
}

export default Home;
