import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Button, Box, Pagination } from "@mui/material";
import SearchForm from "./SearchForm";
import CarCard from "./CarCard";
import { fetchBrands, searchCars } from "../services/api";
import Swal from "sweetalert2";

const Search = ({ favorites, toggleFavorite, compareList, toggleCompare }) => {
    const [searchParams, setSearchParams] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchBrands().then(setBrands).catch(console.error);
    }, []);

    const handleSearch = async (params, pageNumber = 1) => {
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
    };

    const handlePageChange = (event, value) => {
        handleSearch(searchParams, value);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Search Cars
            </Typography>
            <SearchForm brands={brands} onSearch={handleSearch} />
            {loading ? (
                <Typography>Loading...</Typography>
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
                                        onToggleFavorite={() => toggleFavorite(result)}
                                        onToggleCompare={() => toggleCompare(result)}
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
