import { useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const TopNavBar = () => {
    const location = useLocation();

    const getTopNavContent = () => {
        switch (location.pathname) {
            case '/home':
                return <Typography variant="h6">APT SIDE GAMES</Typography>;
            case '/profile':
                return <Typography variant="h6">Profile</Typography>;
            case '/login':
                return <Typography variant="h6">Login</Typography>;
            case '/cart':
                return <Typography variant="h6">Cart</Typography>;
            default:
                return <Typography variant="h6">APT SIDE GAMES</Typography>;
        }
    };

    return (
        <AppBar position="static" sx={{ width: '100%', mb: 2, backgroundColor: '#0f5298' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <IconButton edge="start" color="inherit">
                        {location.pathname === '/' && <HomeIcon />}
                        {location.pathname === '/profile' && <AccountCircleIcon />}
                        {location.pathname === '/login' && <LoginIcon />}
                        {location.pathname === '/cart' && <ShoppingCartIcon />}
                    </IconButton>
                    {getTopNavContent()}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopNavBar;
