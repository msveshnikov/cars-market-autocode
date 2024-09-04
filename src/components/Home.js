import React from "react";
import { Box, Typography, Button, Container, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

const Home = () => (
    <Box>
        <Box
            sx={{
                backgroundImage:
                    "url('https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "70vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "white",
            }}
        >
            <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.6)", padding: "40px", borderRadius: "10px" }}>
                <Typography variant="h2" gutterBottom>
                    Welcome to Cars Market
                </Typography>
                <Typography variant="h5" paragraph>
                    Browse and search for your dream car using our advanced search capabilities.
                </Typography>
                <Button component={Link} to="/search" variant="contained" color="secondary" size="large" sx={{ mt: 2 }}>
                    Start Searching
                </Button>
            </Box>
        </Box>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 240,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <SearchIcon sx={{ fontSize: 60, mb: 2 }} />
                        <Typography variant="h5" gutterBottom>
                            Advanced Search
                        </Typography>
                        <Typography variant="body1" align="center">
                            Find your perfect car with our powerful search filters.
                        </Typography>
                        <Button component={Link} to="/search" variant="outlined" sx={{ mt: 2 }}>
                            Search Cars
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 240,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <FavoriteIcon sx={{ fontSize: 60, mb: 2 }} />
                        <Typography variant="h5" gutterBottom>
                            Favorites
                        </Typography>
                        <Typography variant="body1" align="center">
                            Save and manage your favorite cars for easy access.
                        </Typography>
                        <Button component={Link} to="/favorites" variant="outlined" sx={{ mt: 2 }}>
                            View Favorites
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 240,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CompareArrowsIcon sx={{ fontSize: 60, mb: 2 }} />
                        <Typography variant="h5" gutterBottom>
                            Compare Cars
                        </Typography>
                        <Typography variant="body1" align="center">
                            Compare different car models side by side.
                        </Typography>
                        <Button component={Link} to="/compare" variant="outlined" sx={{ mt: 2 }}>
                            Compare Now
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </Box>
);

export default Home;
