import React from "react";
import PropTypes from "prop-types";
import { Container, Typography, Grid } from "@mui/material";
import CarCard from "./CarCard";

const Favorites = ({ favorites, toggleFavorite }) => (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
            Favorite Cars
        </Typography>
        <Grid container spacing={3}>
            {favorites.map((car) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={car._id}>
                    <CarCard car={car} isFavorite={true} onToggleFavorite={() => toggleFavorite(car)} />
                </Grid>
            ))}
        </Grid>
    </Container>
);

Favorites.propTypes = {
    favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
    toggleFavorite: PropTypes.func.isRequired,
};

export default Favorites;