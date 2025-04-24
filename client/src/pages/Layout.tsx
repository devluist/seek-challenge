import React from 'react';
import { useTheme, useMediaQuery, AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../hooks/useAuthStore';

interface LayoutProps {
    children: React.ReactNode;
}


export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (path: string) => {
        handleMenuClose();
        navigate(path);
    };


    const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        handleMenuClose();
        await logout();
        navigate('/login');
    };


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Tasks App
                    </Typography>

                    {/* For mobile, an icon button to open the menu */}
                    {isMobile ? (
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        // On larger screens, display menu options in the top right
                        <>
                            <MenuItem onClick={() => handleNavigation('/tasks')}>Tasks</MenuItem>
                            <MenuItem onClick={() => handleNavigation('/dashboard')}>Dashboard</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </>
                    )}
                </Toolbar>
            </AppBar>

            {/* Popup menu used for mobile */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={() => handleNavigation('/tasks')}>Tasks</MenuItem>
                <MenuItem onClick={() => handleNavigation('/dashboard')}>Dashboard</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>

            <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                {children}
            </Box>
        </Box>
    );
};
