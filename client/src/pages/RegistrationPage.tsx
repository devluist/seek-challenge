import React, { useState } from 'react';
import { Button, Container, TextField, Paper, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '../hooks/useAuthStore';
import { enqueueSnackbar } from 'notistack';


export const RegistrationPage: React.FC = () => {
    const { register } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await register(email, password);
            navigate('/login');

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
                    Register
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
                        Register
                    </Button>
                </Box>

                <Link
                    to="/login"
                    style={{ textAlign: 'center', display: 'block', marginTop: '16px' }}
                >
                    Already have an account? Login
                </Link>
            </Paper>
        </Container>
    );
};
