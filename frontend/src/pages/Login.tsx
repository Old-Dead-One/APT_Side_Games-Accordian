import React, { useState } from "react";
import { Box, Typography, Button, TextField, Stack, List, ListItem } from "@mui/material";
import { useUser } from "../context/UserContext";
import Login from "@mui/icons-material/Login";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    const { user, login, logout, isLoggedIn } = useUser();

    const handleLogin = async () => {
        login(email, password); // login from UserContext
    };

    const getUsername = () => {
        return user?.user_metadata?.username || user?.email;
    };

    return (
        <Box component={"form"} sx={{ minWidth: 320 }}>
            <Typography variant="h6" align="center" margin={1}>
                <strong>{isLoggedIn ? `Welcome, ${getUsername()}` : isSignUp ? "Sign Up" : "Sign In"}</strong>
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
                                                label="Username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)} />
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
                                onClick={handleLogin}
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

export default LoginPage;
