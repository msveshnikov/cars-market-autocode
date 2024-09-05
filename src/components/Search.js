import React, { useState, useEffect, useCallback } from "react";
import { Container, Typography, Grid, Box, Pagination, CircularProgress } from "@mui/material";
import SearchForm from "./SearchForm";
import CarCard from "./CarCard";
import { fetchBrands, searchCars } from "../services/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { useCompare } from "../hooks/useCompare";
import { useAuth } from "../hooks/useAuth";

const Search = () => {
    const [searchParams, setSearchParams] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const [favorites, toggleFavorite] = useFavorites();
    const [compareList, toggleCompare] = useCompare();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        fetchBrands().then(setBrands).catch(console.error);
    }, []);

    const handleSearch = useCallback(async (params, pageNumber = 1) => {
        setLoading(true);
        try {
            const data = await searchCars({ ...params, page: pageNumber });
            setSearchResults(data.cars);
            setTotalPages(data.totalPages);
            setPage(pageNumber);
            setSearchParams(params);
        } catch (error) {
            console.error("Error fetching search results:", error);
            Swal.fire("Error", "Failed to fetch search results. Please try again later.", "error");
        } finally {
            setLoading(false);
        }
    }, []);

    const handlePageChange = (event, value) => {
        handleSearch(searchParams, value);
    };

    const handleCarClick = (carId) => {
        navigate(`/car/${carId}`);
    };

    const handleToggleFavorite = (car) => {
        if (isAuthenticated) {
            toggleFavorite(car);
        } else {
            Swal.fire("Error", "Please log in to add favorites", "error");
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Search Cars
            </Typography>
            <SearchForm brands={brands} onSearch={handleSearch} />
            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : (
                searchResults?.length > 0 && (
                    <>
                        <Grid container spacing={3} sx={{ mt: 4 }}>
                            {searchResults.map((result) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={result._id}>
                                    <CarCard
                                        car={result}
                                        isFavorite={favorites.some((fav) => fav._id === result._id)}
                                        isCompare={compareList.some((item) => item._id === result._id)}
                                        onToggleFavorite={() => handleToggleFavorite(result)}
                                        onToggleCompare={() => toggleCompare(result)}
                                        onClick={() => handleCarClick(result._id)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                            <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
                        </Box>
                    </>
                )
            )}
        </Container>
    );
};

export default Search;
