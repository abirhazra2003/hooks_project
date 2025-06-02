import * as React from "react";
import { Container, Box, Typography, Paper, Link, Grid } from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';

export default function GuestFooter() {
    return (
        <Paper
            sx={{
                mt: "auto",
                py: 4,
                background: 'linear-gradient(to right, #2a3d47, #1a202c)', // Gradient for modern feel
                color: "#fff",
                borderTop: "1px solid #444",
                boxShadow: "none",
            }}
            component="footer"
            square
        >
            <Container maxWidth="lg">
                <Grid container spacing={6} justifyContent="center" alignItems="center">
                    {/* Logo Section */}
                    <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#FF8C00' }} />
                            <Typography
                                variant="h5"
                                noWrap
                                component={Link}
                                to="/"
                                sx={{
                                    fontWeight: 700,
                                    letterSpacing: '.2rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    '&:hover': { color: '#FF8C00', transition: 'color 0.3s ease' }
                                }}
                            >
                                LOGO
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Links Section */}
                    <Grid item xs={12} sm={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                            <Link
                                href="/about"
                                color="inherit"
                                variant="body2"
                                sx={{
                                    mb: 1,
                                    textDecoration: "none",
                                    fontSize: '1rem',
                                    "&:hover": { color: "#FF8C00", textDecoration: "underline", transition: 'color 0.3s ease' },
                                }}
                            >
                                About Us
                            </Link>
                            <Link
                                href="/contact"
                                color="inherit"
                                variant="body2"
                                sx={{
                                    mb: 1,
                                    textDecoration: "none",
                                    fontSize: '1rem',
                                    "&:hover": { color: "#FF8C00", textDecoration: "underline", transition: 'color 0.3s ease' },
                                }}
                            >
                                Contact
                            </Link>
                            <Link
                                href="/privacy"
                                color="inherit"
                                variant="body2"
                                sx={{
                                    mb: 1,
                                    textDecoration: "none",
                                    fontSize: '1rem',
                                    "&:hover": { color: "#FF8C00", textDecoration: "underline", transition: 'color 0.3s ease' },
                                }}
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                color="inherit"
                                variant="body2"
                                sx={{
                                    textDecoration: "none",
                                    fontSize: '1rem',
                                    "&:hover": { color: "#FF8C00", textDecoration: "underline", transition: 'color 0.3s ease' },
                                }}
                            >
                                Terms of Service
                            </Link>
                        </Box>
                    </Grid>

                    {/* Copyright Section */}
                    <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="caption" color="inherit" sx={{ textAlign: "center", fontSize: '0.9rem' }}>
                                © {new Date().getFullYear()} YourCompany Limited. All rights reserved.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
}
