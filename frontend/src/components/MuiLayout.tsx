import { Box } from "@mui/material";
import BottomNavBar from "./MuiBottomNav";
import TopNavBar from "./MuiTopNav";
import useTheme from "@mui/material/styles/useTheme";

const MuiLayout = ({ children }: { children: React.ReactNode }) => {
    const theme = useTheme();
    return (
        <>
            <TopNavBar />
            <Box
                sx={{
                    flex: 1,
                    position: "fixed",
                    top: "60px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    border: "1px solid",
                    borderColor: theme.palette.mode === "dark" ? "#dcddde" : "#000000",
                    borderRadius: "10px",
                    boxSizing: "border-box",
                    width: "auto",
                    minWidth: "320px",
                    height: "auto",
                    // paddingTop: 2,
                    marginTop: 2,
                    overflow: "auto",
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                }}>
                {children}
            </Box>
            <BottomNavBar />
        </>
    );
};

export default MuiLayout;
