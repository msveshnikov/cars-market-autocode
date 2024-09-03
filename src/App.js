import React, { useState, useEffect } from "react";
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
    Box,
    Skeleton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";

const App = () => {
    const [year, setYear] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [vehicle, setVehicle] = useState("");
    const [gearbox, setGearbox] = useState("");
    const [kilo, setKilo] = useState("");
    const [power, setPower] = useState("");
    const [fueltype, setFueltype] = useState("");
    const [notrepaireddamage, setNotrepaireddamage] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/brands");
            const data = await response.json();
            setBrands(data);
        } catch (error) {
            console.error("Error fetching brands:", error);
            Swal.fire("Error", "Failed to fetch brands. Please try again later.", "error");
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const searchParams = {
                yearofregistration: year,
                brand,
                model,
                vehicletype: vehicle,
                gearbox,
                kilometer: kilo,
                powerps: power,
                fueltype,
                notrepaireddamage,
            };
            const queryString = new URLSearchParams(searchParams).toString();
            const response = await fetch(`http://localhost:5000/api/search?${queryString}`);
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
            Swal.fire("Error", "Failed to fetch search results. Please try again later.", "error");
        } finally {
            setLoading(false);
        }
    };

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const Home = () => (
        <Box>
            <Box
                sx={{
                    backgroundImage:
                        "url('https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "white",
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
        </Box>
    );

    const Search = () => (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Search Cars
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Year"
                        variant="outlined"
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Brand</InputLabel>
                        <Select name="brand" value={brand} onChange={(e) => setBrand(e.target.value)} label="Brand">
                            {brands.map((c) => (
                                <MenuItem key={c} value={c}>
                                    {capitalize(c)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Model"
                        variant="outlined"
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Vehicle Type</InputLabel>
                        <Select
                            name="vehicle"
                            value={vehicle}
                            onChange={(e) => setVehicle(e.target.value)}
                            label="Vehicle Type"
                        >
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
                        <Select
                            name="gearbox"
                            value={gearbox}
                            onChange={(e) => setGearbox(e.target.value)}
                            label="Gearbox"
                        >
                            <MenuItem value={"manuell"}>Manual</MenuItem>
                            <MenuItem value={"automatik"}>Automatic</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Kilometers"
                        variant="outlined"
                        type="text"
                        value={kilo}
                        onChange={(e) => setKilo(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Horse Power"
                        variant="outlined"
                        type="text"
                        value={power}
                        onChange={(e) => setPower(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Fuel Type</InputLabel>
                        <Select
                            name="fueltype"
                            value={fueltype}
                            onChange={(e) => setFueltype(e.target.value)}
                            label="Fuel Type"
                        >
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
                            value={notrepaireddamage}
                            onChange={(e) => setNotrepaireddamage(e.target.value)}
                            label="Damaged"
                        >
                            <MenuItem value={"nein"}>No</MenuItem>
                            <MenuItem value={"ja"}>Yes</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSearch} size="large">
                        Search
                    </Button>
                </Grid>
            </Grid>
            {loading ? (
                <Grid container spacing={3} sx={{ mt: 4 }}>
                    {[...Array(8)].map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card>
                                <Skeleton variant="rectangular" height={160} />
                                <CardContent>
                                    <Skeleton variant="text" width="60%" />
                                    <Skeleton variant="text" width="40%" />
                                    <Skeleton variant="text" width="40%" />
                                    <Skeleton variant="text" width="40%" />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                searchResults.length > 0 && (
                    <Grid container spacing={3} sx={{ mt: 4 }}>
                        {searchResults.map((result) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={result._id}>
                                <Card component={Link} to={`/car/${result._id}`} sx={{ textDecoration: "none" }}>
                                    <CardMedia
                                        component="img"
                                        height="160"
                                        image={
                                            result.image ||
                                            `https://via.placeholder.com/300x200.png?text=${result.brand}+${result.model}`
                                        }
                                        alt={`${result.brand} ${result.model}`}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div">
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
                )
            )}
        </Container>
    );

    const CarDetails = () => {
        const { id } = useParams();
        const [car, setCar] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const fetchCarDetails = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/cars/${id}`);
                    const data = await response.json();
                    setCar(data);
                } catch (error) {
                    console.error("Error fetching car details:", error);
                    Swal.fire("Error", "Failed to fetch car details. Please try again later.", "error");
                } finally {
                    setLoading(false);
                }
            };

            fetchCarDetails();
        }, [id]);

        if (loading) {
            return (
                <Container maxWidth="lg" sx={{ mt: 4 }}>
                    <Skeleton variant="text" height={60} width="40%" />
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Skeleton variant="rectangular" height={400} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Skeleton variant="text" height={30} width="60%" />
                            <Skeleton variant="text" height={20} width="40%" />
                            <Skeleton variant="text" height={20} width="40%" />
                            <Skeleton variant="text" height={20} width="40%" />
                            <Skeleton variant="text" height={20} width="40%" />
                            <Skeleton variant="text" height={20} width="40%" />
                            <Skeleton variant="text" height={20} width="40%" />
                            <Skeleton variant="text" height={30} width="60%" sx={{ mt: 2 }} />
                        </Grid>
                    </Grid>
                </Container>
            );
        }

        if (!car) {
            return <Typography>Car not found</Typography>;
        }

        return (
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    {capitalize(car.brand)} {car.model}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="400"
                                image={
                                    car.image ||
                                    `https://via.placeholder.com/300x200.png?text=${car.brand}+${car.model}`
                                }
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
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Price: {Math.round(car.price)} EUR
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        );
    };

    const theme = createTheme({
        palette: {
            mode: "light",
            primary: {
                main: "#1976D2",
            },
            secondary: {
                main: "#FF4081",
            },
        },
        typography: {
            fontFamily: "'Roboto', sans-serif",
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                component={Link}
                                to="/"
                            >
                                <HomeIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Cars Market
                            </Typography>
                            <Button color="inherit" component={Link} to="/search">
                                <SearchIcon sx={{ mr: 1 }} />
                                Search
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/car/:id" element={<CarDetails />} />
                    </Routes>
                </Box>
            </Router>
        </ThemeProvider>
    );
};

export default App;
