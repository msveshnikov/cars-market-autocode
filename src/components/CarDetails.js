import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid, Card, CardMedia, Button, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { fetchCarDetails } from "../services/api";
import Swal from "sweetalert2";

const CarDetails = ({ favorites, toggleFavorite, compareList, toggleCompare }) => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCarDetails(id)
            .then(setCar)
            .catch((error) => {
                console.error("Error fetching car details:", error);
                Swal.fire("Error", "Failed to fetch car details. Please try again later.", "error");
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (!car) {
        return <Typography>Car not found</Typography>;
    }

    const isFavorite = favorites.some((fav) => fav._id === car._id);
    const isCompare = compareList.some((item) => item._id === car._id);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                {car.brand} {car.model}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="400"
                            image={
                                car.image || `https://via.placeholder.com/300x200.png?text=${car.brand}+${car.model}`
                            }
                            alt={`${car.brand} ${car.model}`}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Details</Typography>
                    <Typography>Year: {car.yearofregistration}</Typography>
                    <Typography>Vehicle Type: {car.vehicletype}</Typography>
                    <Typography>Gearbox: {car.gearbox}</Typography>
                    <Typography>Mileage: {car.kilometer} km</Typography>
                    <Typography>Power: {car.powerps} PS</Typography>
                    <Typography>Fuel Type: {car.fueltype}</Typography>
                    <Typography>Damaged: {car.notrepaireddamage === "nein" ? "No" : "Yes"}</Typography>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Price: {Math.round(car.price)} EUR
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => toggleFavorite(car)}
                            startIcon={<FavoriteIcon />}
                            sx={{ mr: 2 }}
                        >
                            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => toggleCompare(car)}
                            startIcon={<CompareArrowsIcon />}
                        >
                            {isCompare ? "Remove from Compare" : "Add to Compare"}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CarDetails;
