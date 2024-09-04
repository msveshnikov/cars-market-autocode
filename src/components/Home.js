import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => (
    <Box
        sx={{
            backgroundImage:
                "url('https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
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
);

export default Home;
