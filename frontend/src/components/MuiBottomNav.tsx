import { NavLink } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper, Badge } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "./CartContext";

const BottomNavBar = () => {
    const { cartItemsCount } = useCart();

    return (
        <Paper
            sx={{
                position: "fixed",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                maxWidth: "auto",
                backgroundColor: "#0f5298",
                zIndex: 1000,
            }}
        >
            <BottomNavigation
                sx={{
                    backgroundColor: "inherit",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0,
                    "& .MuiBottomNavigationAction-root": {
                        minWidth: "0",
                        padding: "0",
                        margin: "0",
                    },
                }}
            >
                <BottomNavigationAction
                    showLabel
                    label="Home"
                    icon={<HomeIcon />}
                    sx={{ color: "#dcddde", maxWidth: "80px" }}
                    component={NavLink} to="/"
                />
                <BottomNavigationAction
                    showLabel
                    label="Profile"
                    icon={<AccountCircleIcon />}
                    sx={{ color: "#dcddde", maxWidth: "80px" }}
                    component={NavLink} to="/profile"
                />
                <BottomNavigationAction
                    showLabel
                    label="Login"
                    icon={<LoginIcon />}
                    sx={{ color: "#dcddde", maxWidth: "80px" }}
                    component={NavLink} to="/login"
                />
                <BottomNavigationAction
                    showLabel
                    label="Cart"
                    icon={
                        <Badge badgeContent={cartItemsCount} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    }
                    sx={{ color: "#dcddde", maxWidth: "80px" }}
                    component={NavLink} to="/cart"
                />
            </BottomNavigation>
        </Paper>
    );
};

export default BottomNavBar;
