import React, { useState, useEffect } from "react";
import { useInput } from "./useInput";
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import logo from "./assets/orange-car-hp-right-mercedez.png";

const App = () => {
    const year = useInput("");
    const [brand, setBrand] = useState("ford");
    const model = useInput("");
    const [vehicle, setVehicle] = useState("limousine");
    const [gearbox, setGearbox] = useState("manuell");
    const kilo = useInput("");
    const power = useInput("");
    const [fueltype, setFueltype] = useState("benzin");
    const [notrepaireddamage, setNotrepaireddamage] = useState("nein");
    const [searchResults, setSearchResults] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    const brands = [
        "volkswagen",
        "sonstige_autos",
        "lancia",
        "ford",
        "opel",
        "mercedes_benz",
        "toyota",
        "audi",
        "bmw",
        "mitsubishi",
        "fiat",
        "nissan",
        "renault",
        "mazda",
        "subaru",
        "peugeot",
        "smart",
        "mini",
        "hyundai",
        "dacia",
        "porsche",
        "alfa_romeo",
        "daewoo",
        "saab",
        "kia",
        "chevrolet",
        "volvo",
        "skoda",
        "seat",
        "citroen",
        "suzuki",
        "honda",
        "jeep",
        "jaguar",
        "daihatsu",
        "land_rover",
        "chrysler",
        "rover",
        "lada",
    ];

    useEffect(() => {
        const darkModePreference = localStorage.getItem("darkMode");
        if (darkModePreference) {
            setDarkMode(JSON.parse(darkModePreference));
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
    };

    const handleGear = (event) => {
        setGearbox(event.target.value);
    };

    const handleRepair = (event) => {
        setNotrepaireddamage(event.target.value);
    };

    const handleFuel = (event) => {
        setFueltype(event.target.value);
    };

    const handleVehicle = (event) => {
        setVehicle(event.target.value);
    };

    const handleBrand = (event) => {
        setBrand(event.target.value);
    };

    const searchHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `/api/search?yearofregistration=${year.value}&brand=${brand}&model=${model.value}&vehicletype=${vehicle}&gearbox=${gearbox}&kilometer=${kilo.value}&powerps=${power.value}&fueltype=${fueltype}&notrepaireddamage=${notrepaireddamage}`
            );
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const Home = () => (
        <Container>
            <Typography variant="h4" gutterBottom>
                Welcome to Cars Market
            </Typography>
            <Typography variant="body1" paragraph>
                Browse and search for your dream car using our advanced search capabilities.
            </Typography>
            <Button component={Link} to="/search" variant="contained" color="primary">
                Start Searching
            </Button>
        </Container>
    );

    const Search = () => (
        <Container>
            <Typography variant="h4" gutterBottom>
                Search Cars
            </Typography>
            <form onSubmit={searchHandler} className="search">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Year" variant="outlined" type="text" {...year} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Brand</InputLabel>
                            <Select name="brand" value={brand} onChange={handleBrand} label="Brand">
                                {brands.map((c) => (
                                    <MenuItem key={c} value={c}>
                                        {capitalize(c)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Model" variant="outlined" type="text" {...model} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Vehicle Type</InputLabel>
                            <Select name="vehicle" value={vehicle} onChange={handleVehicle} label="Vehicle Type">
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
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Gearbox</InputLabel>
                            <Select name="gearbox" value={gearbox} onChange={handleGear} label="Gearbox">
                                <MenuItem value={"manuell"}>Manual</MenuItem>
                                <MenuItem value={"automatik"}>Automatic</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Kilometers" variant="outlined" type="text" {...kilo} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Horse Power" variant="outlined" type="text" {...power} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Fuel Type</InputLabel>
                            <Select name="fueltype" value={fueltype} onChange={handleFuel} label="Fuel Type">
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
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Damaged</InputLabel>
                            <Select
                                name="notrepaireddamage"
                                value={notrepaireddamage}
                                onChange={handleRepair}
                                label="Damaged"
                            >
                                <MenuItem value={"nein"}>No</MenuItem>
                                <MenuItem value={"ja"}>Yes</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {searchResults.length > 0 && (
                <Grid container spacing={2} style={{ marginTop: "20px" }}>
                    {searchResults.map((result, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://source.unsplash.com/featured/?car,${result.brand}`}
                                    alt={`${result.brand} ${result.model}`}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {capitalize(result.brand)} {result.model}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price: {Math.round(result.price)} EUR
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Year: {result.yearofregistration}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Mileage: {result.kilometer} km
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );

    return (
        <ThemeProvider theme={createTheme({ palette: { mode: darkMode ? "dark" : "light" } })}>
            <Router>
                <div className="App">
                    <Container>
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" style={{ maxWidth: "200px" }} />
                            <nav>
                                <Button component={Link} to="/" color="inherit">
                                    Home
                                </Button>
                                <Button component={Link} to="/search" color="inherit">
                                    Search
                                </Button>
                                <Button onClick={toggleDarkMode} color="inherit">
                                    {darkMode ? "Light Mode" : "Dark Mode"}
                                </Button>
                            </nav>
                        </header>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/search" element={<Search />} />
                        </Routes>
                    </Container>
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
