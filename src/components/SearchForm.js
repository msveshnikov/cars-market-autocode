import React, { useState, useEffect } from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem, Button, Slider, Typography, Box } from "@mui/material";
import { fetchModels } from "../services/api";

const SearchForm = ({ brands, onSearch }) => {
    const [formData, setFormData] = useState({
        yearofregistration: [1900, new Date().getFullYear()],
        brand: "",
        model: "",
        vehicletype: "",
        gearbox: "",
        fueltype: "",
        notrepaireddamage: "",
        kilometer: [0, 500000],
        powerps: [0, 1000],
        price: [0, 100000],
    });
    const [models, setModels] = useState([]);

    useEffect(() => {
        if (formData.brand) {
            fetchModels(formData.brand)
                .then(setModels)
                .catch((error) => console.error("Error fetching models:", error));
        }
    }, [formData.brand]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSliderChange = (name) => (event, newValue) => {
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = {
            "yearofregistration[min]": formData.yearofregistration[0],
            "yearofregistration[max]": formData.yearofregistration[1],
            "kilometer[min]": formData.kilometer[0],
            "kilometer[max]": formData.kilometer[1],
            "powerps[min]": formData.powerps[0],
            "powerps[max]": formData.powerps[1],
            "price[min]": formData.price[0],
            "price[max]": formData.price[1],
            ...Object.fromEntries(
                Object.entries(formData).filter(([key, value]) => !Array.isArray(value) && value !== "")
            ),
        };
        onSearch(params);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Brand</InputLabel>
                        <Select name="brand" value={formData.brand} onChange={handleChange}>
                            {brands.map((brand) => (
                                <MenuItem key={brand} value={brand}>
                                    {brand}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Model</InputLabel>
                        <Select name="model" value={formData.model} onChange={handleChange}>
                            {models.map((model) => (
                                <MenuItem key={model} value={model}>
                                    {model}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Vehicle Type</InputLabel>
                        <Select name="vehicletype" value={formData.vehicletype} onChange={handleChange}>
                            <MenuItem value="limousine">Sedan</MenuItem>
                            <MenuItem value="coupe">Coupe</MenuItem>
                            <MenuItem value="kleinwagen">Hatchback</MenuItem>
                            <MenuItem value="suv">SUV</MenuItem>
                            <MenuItem value="kombi">Combi</MenuItem>
                            <MenuItem value="cabrio">Cabriolet</MenuItem>
                            <MenuItem value="bus">Bus</MenuItem>
                            <MenuItem value="andere">Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Gearbox</InputLabel>
                        <Select name="gearbox" value={formData.gearbox} onChange={handleChange}>
                            <MenuItem value="manuell">Manual</MenuItem>
                            <MenuItem value="automatik">Automatic</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Fuel Type</InputLabel>
                        <Select name="fueltype" value={formData.fueltype} onChange={handleChange}>
                            <MenuItem value="benzin">Gasoline</MenuItem>
                            <MenuItem value="diesel">Diesel</MenuItem>
                            <MenuItem value="hybrid">Hybrid</MenuItem>
                            <MenuItem value="lpg">LPG</MenuItem>
                            <MenuItem value="cng">CNG</MenuItem>
                            <MenuItem value="elektro">Electric</MenuItem>
                            <MenuItem value="andere">Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Damaged</InputLabel>
                        <Select name="notrepaireddamage" value={formData.notrepaireddamage} onChange={handleChange}>
                            <MenuItem value="nein">No</MenuItem>
                            <MenuItem value="ja">Yes</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={15}>
                        <Grid item xs={3}>
                            <Typography gutterBottom>Year</Typography>
                            <Slider
                                value={formData.yearofregistration}
                                onChange={handleSliderChange("yearofregistration")}
                                valueLabelDisplay="auto"
                                min={1900}
                                max={new Date().getFullYear()}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography gutterBottom>Mileage (km)</Typography>
                            <Slider
                                value={formData.kilometer}
                                onChange={handleSliderChange("kilometer")}
                                valueLabelDisplay="auto"
                                min={0}
                                max={500000}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography gutterBottom>Power (PS)</Typography>
                            <Slider
                                value={formData.powerps}
                                onChange={handleSliderChange("powerps")}
                                valueLabelDisplay="auto"
                                min={0}
                                max={1000}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography gutterBottom>Price (EUR)</Typography>
                            <Slider
                                value={formData.price}
                                onChange={handleSliderChange("price")}
                                valueLabelDisplay="auto"
                                min={0}
                                max={100000}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button type="submit" variant="contained" color="primary">
                            Search
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default SearchForm;