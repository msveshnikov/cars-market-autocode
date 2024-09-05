/* eslint-disable react/prop-types */
import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, Button, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LazyLoad from "react-lazyload";

const CarCard = ({ car, isFavorite, onToggleFavorite, onClick }) => (
    <LazyLoad height={300} once>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardMedia
                component="img"
                height="160"
                image={car.image || `https://via.placeholder.com/300x200.png?text=${car.brand}+${car.model}`}
                alt={`${car.brand} ${car.model}`}
                onClick={() => onClick(car._id)}
                sx={{ cursor: "pointer" }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom>
                    {car.brand} {car.model}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Year: {car.yearofregistration}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Mileage: {car.kilometer.toLocaleString()} km
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Fuel: {car.fueltype}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    €{Math.round(car.price).toLocaleString()}
                </Typography>
            </CardContent>
            <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button variant="outlined" size="small" component={Link} to={`/car/${car._id}`}>
                    View Details
                </Button>
                <Box>
                    <Tooltip title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
                        <IconButton onClick={() => onToggleFavorite(car)} color={isFavorite ? "secondary" : "default"}>
                            <FavoriteIcon />
                        </IconButton>
                    </Tooltip>
                    {/* <Tooltip title={isCompare ? "Remove from Compare" : "Add to Compare"}>
                        <IconButton onClick={() => onToggleCompare(car)} color={isCompare ? "primary" : "default"}>
                            <CompareArrowsIcon />
                        </IconButton>
                    </Tooltip> */}
                </Box>
            </Box>
        </Card>
    </LazyLoad>
);

export default CarCard;
