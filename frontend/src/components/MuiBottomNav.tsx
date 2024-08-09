import { NavLink } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useTheme } from './MuiThemeContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const BottomNavBar = () => {
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <Paper
            elevation={3}
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <BottomNavigation
                sx={{
                    width: '100%',
                    backgroundColor: '#0f5298',
                }}
            >
                <BottomNavigationAction
                    showLabel
                    label={darkMode ? 'Light' : 'Dark'}
                    icon={<DarkModeIcon sx={{ color: darkMode ? '#dcddde' : '#dcddde' }} />}
                    onClick={toggleDarkMode}
                    sx={{ color: '#dcddde', margin: '0 auto' }}
                />
                <BottomNavigationAction
                    showLabel
                    label="Profile"
                    icon={<AccountCircleIcon />}
                    sx={{ color: '#dcddde', margin: '0 auto' }}
                    component={NavLink} to="/profile"
                />
                <BottomNavigationAction
                    showLabel
                    label="Login"
                    icon={<LoginIcon />}
                    sx={{ color: '#dcddde', margin: '0 auto' }}
                    component={NavLink} to="/login"
                />
                <BottomNavigationAction
                    showLabel
                    label="Cart"
                    icon={<ShoppingCartIcon />}
                    sx={{ color: '#dcddde', margin: '0 auto' }}
                    component={NavLink} to="/cart"
                />
            </BottomNavigation>
        </Paper>
    );
};

export default BottomNavBar;
