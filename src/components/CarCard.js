import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

const CarCard = ({ car, isFavorite, isCompare, onToggleFavorite, onToggleCompare }) => (
    <Card>
        <CardMedia
            component="img"
            height="160"
            image={car.image || `https://via.placeholder.com/300x200.png?text=${car.brand}+${car.model}`}
            alt={`${car.brand} ${car.model}`}
        />
        <CardContent>
            <Typography variant="h6" component="div">
                {car.brand} {car.model}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Price: {Math.round(car.price)} EUR
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Year: {car.yearofregistration}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Mileage: {car.kilometer} km
            </Typography>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" size="small" component={Link} to={`/car/${car._id}`}>
                    View Details
                </Button>
                <IconButton onClick={onToggleFavorite} color={isFavorite ? "secondary" : "default"}>
                    <FavoriteIcon />
                </IconButton>
                <IconButton onClick={onToggleCompare} color={isCompare ? "primary" : "default"}>
                    <CompareArrowsIcon />
                </IconButton>
            </Box>
        </CardContent>
    </Card>
);

export default CarCard;
