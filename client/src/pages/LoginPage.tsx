import React, { useState } from 'react';
import { Button, Container, TextField, Paper, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '../hooks/useAuthStore';
import { useSnackbar } from 'notistack';


export const LoginPage: React.FC = () => {
    const { login } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await login(email, password);
            navigate('/tasks');

        } catch (error: unknown) {
            if (error instanceof Error) {
                const msg = JSON.parse(error.message);
                enqueueSnackbar(msg.message, { variant: 'error' });
            } else {
                enqueueSnackbar('An unknown error occurred.', { variant: 'error' });
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Login
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        required
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        required
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Login
                    </Button>

                    <Link to="/register" style={{ textAlign: 'center', marginTop: '16px' }}>
                        Don't have an account? Register
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
};
