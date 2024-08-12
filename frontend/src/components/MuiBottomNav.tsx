import { NavLink } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const BottomNavBar = () => {

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
                width: 'auto',
            }}
        >
            <BottomNavigation
                sx={{
                    width: '100%',
                    backgroundColor: '#0f5298',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: 0,
                    '& .MuiBottomNavigationAction-root': {
                        minWidth: 0,
                        padding: '0',
                        margin: '0',
                    },
                }}
            >
                <BottomNavigationAction
                    showLabel
                    label="Home"
                    icon={<HomeIcon />}
                    sx={{ color: '#dcddde', margin: '0 auto', maxWidth: '80px' }}
                    component={NavLink} to="/"
                />
                <BottomNavigationAction
                    showLabel
                    label="Profile"
                    icon={<AccountCircleIcon />}
                    sx={{ color: '#dcddde', margin: '0 auto', maxWidth: '80px' }}
                    component={NavLink} to="/profile"
                />
                <BottomNavigationAction
                    showLabel
                    label="Login"
                    icon={<LoginIcon />}
                    sx={{ color: '#dcddde', margin: '0 auto', maxWidth: '80px' }}
                    component={NavLink} to="/login"
                />
                <BottomNavigationAction
                    showLabel
                    label="Cart"
                    icon={<ShoppingCartIcon />}
                    sx={{ color: '#dcddde', margin: '0 auto', maxWidth: '80px' }}
                    component={NavLink} to="/cart"
                />
            </BottomNavigation>
        </Paper>
    );
};

export default BottomNavBar;
