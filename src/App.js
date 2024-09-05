import React from "react";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import Header from "./components/Header";
import Home from "./components/Home";
import Search from "./components/Search";
import CarDetails from "./components/CarDetails";
import Favorites from "./components/Favorites";
import Compare from "./components/Compare";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useDarkMode } from "./hooks/useDarkMode";
import { useFavorites } from "./hooks/useFavorites";
import { useCompare } from "./hooks/useCompare";
import { useAuth } from "./hooks/useAuth";

const App = () => {
    const [darkMode, toggleDarkMode] = useDarkMode();
    const [favorites, toggleFavorite] = useFavorites();
    const [compareList, toggleCompare] = useCompare();
    const { user, loading, login, signup, logout } = useAuth();

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} user={user} logout={logout} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/search"
                            element={
                                <Search
                                    favorites={favorites}
                                    toggleFavorite={toggleFavorite}
                                    compareList={compareList}
                                    toggleCompare={toggleCompare}
                                />
                            }
                        />
                        <Route
                            path="/car/:id"
                            element={
                                <CarDetails
                                    favorites={favorites}
                                    toggleFavorite={toggleFavorite}
                                    compareList={compareList}
                                    toggleCompare={toggleCompare}
                                />
                            }
                        />
                        <Route
                            path="/favorites"
                            element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />}
                        />
                        <Route
                            path="/compare"
                            element={<Compare compareList={compareList} toggleCompare={toggleCompare} />}
                        />
                        <Route path="/login" element={<Login login={login} />} />
                        <Route path="/signup" element={<Signup signup={signup} />} />
                    </Routes>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default App;
