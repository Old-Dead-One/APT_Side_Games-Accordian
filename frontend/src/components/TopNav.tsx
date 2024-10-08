import { useLocation, NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const TopNavBar = () => {
    const { darkMode, toggleDarkMode } = useTheme();
    const location = useLocation();

    const getTopNavContent = () => {
        switch (location.pathname) {
            case "/":
                return <Typography variant="subtitle1">Home</Typography>;
            case "/profile":
                return <Typography variant="subtitle1">Profile</Typography>;
            case "/login":
                return <Typography variant="subtitle1">Login</Typography>;
            case "/cart":
                return <Typography variant="subtitle1">Cart</Typography>;
            default:
                return <Typography variant="subtitle1">Home</Typography>;
        }
    };

    return (
        <AppBar
            sx={{
                position: "fixed",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                maxWidth: "auto",
                backgroundColor: "#0f5298",
                zIndex: 1000,
            }}>
            <Toolbar>
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                    }}>
                    <NavLink to="/" style={{ color: "inherit", textDecoration: "none" }}>
                        <Button
                            size="large"
                            color="inherit"
                            startIcon={
                                <img
                                    src="/APTBlackCircle.png"
                                    alt="APT Logo"
                                    style={{ width: 30, height: 30 }}
                                />
                            }
                        >
                            APT SIDE GAMES
                        </Button>
                    </NavLink>

                    <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={toggleDarkMode}
                            sx={{
                                marginLeft: 1,
                                color: "#dcddde",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {darkMode ? (
                                <LightModeIcon sx={{ color: "#dcddde" }} />
                            ) : (
                                <DarkModeIcon sx={{ color: "#dcddde" }} />
                            )}
                            <Typography variant="subtitle2">
                                {darkMode ? "Light Mode" : "Dark Mode"}
                            </Typography>
                        </IconButton>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
                        <IconButton edge="end" color="inherit"></IconButton>
                    </Box>
                    {getTopNavContent()}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopNavBar;
