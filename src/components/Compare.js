import React from "react";
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button } from "@mui/material";

const Compare = ({ compareList, toggleCompare }) => (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
            Compare Cars
        </Typography>
        <Grid container spacing={3}>
            {compareList.map((car) => (
                <Grid item xs={12} sm={6} md={4} key={car._id}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="160"
                            image={
                                car.image || `https://via.placeholder.com/300x200.png?text=${car.brand}+${car.model}`
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
                            <Typography>Mileage: {car.kilometer} km</Typography>
                            <Typography>Power: {car.powerps} PS</Typography>
                            <Typography>Fuel Type: {car.fueltype}</Typography>
                            <Typography>Damaged: {car.notrepaireddamage === "nein" ? "No" : "Yes"}</Typography>
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                Price: {Math.round(car.price)} EUR
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
                </Grid>
            ))}
        </Grid>
    </Container>
);

export default Compare;
