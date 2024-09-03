import { Button } from "@mui/material";
import { useTheme } from "./MuiThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeToggle = () => {
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <Button
            size="large"
            onClick={toggleDarkMode}
            startIcon={<DarkModeIcon sx={{ color: darkMode ? "#dcddde" : "#dcddde" }} />}
            sx={{ minWidth: "auto" }}
        >
        </Button>
    );
};

export default ThemeToggle;


