import React, { useState } from "react";
import { Box, Typography, Button, TextField, Stack, List, ListItem } from "@mui/material";
import { useUser } from "../context/UserContext";
import Login from "@mui/icons-material/Login";

const loginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [displayName, setdisplayName] = useState<string>("");
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    const { user, login, signUp, logout, isLoggedIn } = useUser();

    const handleAuth = async () => {
        try {
            if (isSignUp) {
                // Sign Up logic
                if (!displayName) {
                    alert("Please enter a displayName");
                    return;
                }
                await signUp(email, password, displayName);
            } else {
                // Login logic
                login(email, password);
            }
        } catch (error) {
            alert(isSignUp ? "Sign Up failed" : "Login failed from LoginPage");
        }
    };

    const getdisplayName = () => {
        return user?.user_metadata?.displayName || user?.email;
    };

    return (
        <Box component={"form"} sx={{ minWidth: 320 }}>
            <Typography variant="h6" align="center" margin={1}>
                <strong>{isLoggedIn ? `Welcome, ${getdisplayName()}` : isSignUp ? "Sign Up" : "Sign In"}</strong>
            </Typography>

            {!isLoggedIn ? (
                <List>
                    <ListItem>
                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            alignItems="center"
                            minWidth={320}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    border: "1px solid",
                                    borderRadius: "10px",
                                    boxSizing: "border-box",
                                    width: "auto",
                                    height: "auto",
                                    overflow: "auto",
                                }}>
                                <List>
                                    <ListItem>
                                        <TextField
                                            fullWidth
                                            required
                                            label="Email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoComplete="email"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <TextField
                                            fullWidth
                                            required
                                            label="Password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="current-password"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        {isSignUp && (
                                            <TextField
                                                fullWidth
                                                required
                                                label="displayName"
                                                value={displayName}
                                                onChange={(e) => setdisplayName(e.target.value)}
                                                autoComplete="displayName"
                                            />
                                        )}
                                    </ListItem>
                                </List>
                                <Stack
                                    direction="column"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Button
                                        variant="text"
                                        color="secondary"
                                        onClick={() => setIsSignUp(!isSignUp)}
                                    >
                                        {isSignUp
                                            ? "Already have an account? Sign In"
                                            : "Don't have an account? Sign Up"}
                                    </Button>
                                    <Typography variant="caption" color={"red"}>* Indicates a Required Field</Typography>
                                </Stack>
                            </Box>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<Login />}
                                onClick={handleAuth}
                                sx={{ marginTop: 2 }}
                            >
                                {isSignUp ? "Sign Up" : "Login"}
                            </Button>
                        </Stack>
                    </ListItem>
                </List>
            ) : (
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ marginBottom: 2 }}
                    onClick={logout}
                >
                    Logout
                </Button>
            )}
        </Box>
    );
};

export default loginPage;
