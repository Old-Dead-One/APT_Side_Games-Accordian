import { Box } from '@mui/material';
import BottomNavBar from './MuiBottomNav';
import TopNavBar from './MuiTopNav';

const MuiLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'

            }}>
            <TopNavBar />
            <Box sx={{ flex: 1 }}>
                {children}
            </Box>

            <BottomNavBar />
        </Box>
    );
};

export default MuiLayout;
