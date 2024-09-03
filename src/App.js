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
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const App = () => {
    const year = useInput("");
    const [brand, setBrand] = useState("");
    const model = useInput("");
    const [vehicle, setVehicle] = useState("");
    const [gearbox, setGearbox] = useState("");
    const kilo = useInput("");
    const power = useInput("");
    const [fueltype, setFueltype] = useState("");
    const [notrepaireddamage, setNotrepaireddamage] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const darkModePreference = localStorage.getItem("darkMode");
        if (darkModePreference) {
            setDarkMode(JSON.parse(darkModePreference));
        }
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/brands");
            const data = await response.json();
            setBrands(data);
        } catch (error) {
            console.error("Error fetching brands:", error);
        }
    };

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setDrawerOpen(open);
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
                `http://localhost:5000/api/search?yearofregistration=${year.value}&brand=${brand}&model=${model.value}&vehicletype=${vehicle}&gearbox=${gearbox}&kilometer=${kilo.value}&powerps=${power.value}&fueltype=${fueltype}&notrepaireddamage=${notrepaireddamage}`
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
        <Box>
            <Box
                sx={{
                    backgroundImage: "url('https://source.unsplash.com/random/1600x900/?luxury,car')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "600px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "white",
                    marginBottom: "2rem",
                }}
            >
                <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.6)", padding: "40px", borderRadius: "10px" }}>
                    <Typography variant="h2" gutterBottom>
                        Welcome to Cars Market
                    </Typography>
                    <Typography variant="h5" paragraph>
                        Browse and search for your dream car using our advanced search capabilities.
                    </Typography>
                    <Button
                        component={Link}
                        to="/search"
                        variant="contained"
                        color="secondary"
                        size="large"
                        sx={{ mt: 2 }}
                    >
                        Start Searching
                    </Button>
                </Box>
            </Box>
            <Container>
                <Typography variant="h4" gutterBottom>
                    Key Features
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Modern UI
                                </Typography>
                                <Typography>
                                    Enjoy a seamless experience with our React v18 and Material-UI 5 powered interface
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Advanced Search
                                </Typography>
                                <Typography>
                                    Find your perfect car using our rich filtering options and powerful search
                                    capabilities
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    High-Quality Images
                                </Typography>
                                <Typography>
                                    View detailed, high-resolution car images sourced from Google Images
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
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
                            <Card component={Link} to={`/car/${result._id}`} style={{ textDecoration: "none" }}>
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

    const CarDetails = () => {
        const { id } = useParams();
        const [car, setCar] = useState(null);

        useEffect(() => {
            const fetchCarDetails = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/cars/${id}`);
                    const data = await response.json();
                    setCar(data);
                } catch (error) {
                    console.error("Error fetching car details:", error);
                }
            };

            fetchCarDetails();
        }, [id]);

        if (!car) {
            return <Typography>Loading...</Typography>;
        }

        return (
            <Container>
                <Typography variant="h4" gutterBottom>
                    {capitalize(car.brand)} {car.model}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="300"
                                image={`https://source.unsplash.com/featured/?car,${car.brand}`}
                                alt={`${car.brand} ${car.model}`}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6">Details</Typography>
                        <Typography>Year: {car.yearofregistration}</Typography>
                        <Typography>Vehicle Type: {capitalize(car.vehicletype)}</Typography>
                        <Typography>Gearbox: {capitalize(car.gearbox)}</Typography>
                        <Typography>Mileage: {car.kilometer} km</Typography>
                        <Typography>Power: {car.powerps} PS</Typography>
                        <Typography>Fuel Type: {capitalize(car.fueltype)}</Typography>
                        <Typography>Damaged: {car.notrepaireddamage === "nein" ? "No" : "Yes"}</Typography>
                        <Typography variant="h6" style={{ marginTop: "1rem" }}>
                            Price: {Math.round(car.price)} EUR
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        );
    };

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
        },
    });

    const drawerContent = (
        <div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/search">
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                    <ListItemText primary="Search" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div className="App">
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" style={{ flexGrow: 1 }}>
                                Cars Market
                            </Typography>
                            <IconButton color="inherit" onClick={toggleDarkMode}>
                                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                        {drawerContent}
                    </Drawer>
                    <Box sx={{ marginTop: "2rem" }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/car/:id" element={<CarDetails />} />
                        </Routes>
                    </Box>
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
