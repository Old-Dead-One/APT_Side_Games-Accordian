import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableContainer, Table, TableBody, TableRow, TableCell, TextField, Button, Typography, Paper, Alert, Stack, } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = () => {
        // Simulate login validation. Replace this with real authentication logic.
        if (email === "test@example.com" && password === "password") {
            navigate("/home"); // Redirect to profile or home after successful login
        } else {
            setErrorMessage("Invalid email or password");
        }
    };

    return (
        <TableContainer component={Paper} sx={{ maxWidth: 400 }}>
            <Typography align="center" variant="h6">
                <strong>Login</strong>
            </Typography>
            {errorMessage && (
                <Alert severity="error">{errorMessage}</Alert>
            )}
            <Table sx={{ minWidth: 320 }} size="small" aria-label="login table">
                <TableBody>
                    <TableRow >
                        <TableCell component="th" scope="row" sx={{ border: 0 }}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                sx={{ minWidth: 320 }}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" sx={{ border: 0 }}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                sx={{ minWidth: 320 }}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" sx={{ border: 0 }}>
                            <Stack direction="row" justifyContent="center">
                                <Button
                                    startIcon={<LoginIcon />}
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                            </Stack>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Typography variant="body2" align="center">
                Don’t have an account? <a href="/signup">Sign up</a>
            </Typography>
        </TableContainer>
    );
};

export default LoginPage;
