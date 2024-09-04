import React, { useState } from "react";
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

const SearchForm = ({ brands, onSearch }) => {
    const [formData, setFormData] = useState({
        yearofregistration: "",
        brand: "",
        model: "",
        vehicletype: "",
        gearbox: "",
        fueltype: "",
        notrepaireddamage: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(formData);
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
                    <TextField fullWidth label="yearofregistration" name="yearofregistration" value={formData.yearofregistration} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Model"
                        variant="outlined"
                        name="model"
                        type="text"
                        value={formData.model}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Vehicle Type</InputLabel>
                        <Select name="vehicle" value={formData.vehicle} onChange={handleChange} label="Vehicle Type">
                            <MenuItem value={"limousine"}>Sedan</MenuItem>
                            <MenuItem value={"coupe"}>Coupe</MenuItem>
                            <MenuItem value={"kleinwagen"}>Hatchback</MenuItem>
                            <MenuItem value={"suv"}>SUV</MenuItem>
                            <MenuItem value={"kombi"}>Combi</MenuItem>
                            <MenuItem value={"cabrio"}>Cabriolet</MenuItem>
                            <MenuItem value={"bus"}>Bus</MenuItem>
                            <MenuItem value={"andere"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Gearbox</InputLabel>
                        <Select name="gearbox" value={formData.gearbox} onChange={handleChange} label="Gearbox">
                            <MenuItem value={"manuell"}>Manual</MenuItem>
                            <MenuItem value={"automatik"}>Automatic</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Fuel Type</InputLabel>
                        <Select name="fueltype" value={formData.fueltype} onChange={handleChange} label="Fuel Type">
                            <MenuItem value={"benzin"}>Gasoline</MenuItem>
                            <MenuItem value={"diesel"}>Diesel</MenuItem>
                            <MenuItem value={"hybrid"}>Hybrid</MenuItem>
                            <MenuItem value={"lpg"}>LPG</MenuItem>
                            <MenuItem value={"cng"}>CNG</MenuItem>
                            <MenuItem value={"elektro"}>Electro</MenuItem>
                            <MenuItem value={"andere"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Damaged</InputLabel>
                        <Select
                            name="notrepaireddamage"
                            value={formData.notrepaireddamage}
                            onChange={handleChange}
                            label="Damaged"
                        >
                            <MenuItem value={"nein"}>No</MenuItem>
                            <MenuItem value={"ja"}>Yes</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Search
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default SearchForm;
