/* eslint-disable react/prop-types */
import React from "react";
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LazyLoad from "react-lazyload";

const Compare = ({ compareList, toggleCompare }) => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mr: 2 }}>
                    Go Back
                </Button>
                <Typography variant="h4">Compare Cars</Typography>
            </Box>
            <Grid container spacing={3}>
                {compareList.map((car) => (
                    <Grid item xs={12} sm={6} md={4} key={car._id}>
                        <LazyLoad height={300} once>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="160"
                                    image={
                                        car.image ||
                                        `https://via.placeholder.com/300x200.png?text=${car.brand}+${car.model}`
                                    }
                                    alt={`${car.brand} ${car.model}`}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {car.brand} {car.model}
                                    </Typography>
                                    <Typography>Year: {car.yearofregistration}</Typography>
                                    <Typography>Vehicle Type: {car.vehicletype}</Typography>
                                    <Typography>Gearbox: {car.gearbox}</Typography>
                                    <Typography>Mileage: {car.kilometer.toLocaleString()} km</Typography>
                                    <Typography>Power: {car.powerps} PS</Typography>
                                    <Typography>Fuel Type: {car.fueltype}</Typography>
                                    <Typography>Damaged: {car.notrepaireddamage === "nein" ? "No" : "Yes"}</Typography>
                                    <Typography variant="h6" sx={{ mt: 2 }}>
                                        Price: €{Math.round(car.price).toLocaleString()}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => toggleCompare(car)}
                                        sx={{ mt: 2 }}
                                    >
                                        Remove from Compare
                                    </Button>
                                </CardContent>
                            </Card>
                        </LazyLoad>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Compare;
