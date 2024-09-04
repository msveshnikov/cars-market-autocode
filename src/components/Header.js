import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Header = ({ darkMode, toggleDarkMode }) => (
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
            <Button color="inherit" component={Link} to="/favorites">
                <FavoriteIcon sx={{ mr: 1 }} />
                Favorites
            </Button>
            <Button color="inherit" component={Link} to="/compare">
                <CompareArrowsIcon sx={{ mr: 1 }} />
                Compare
            </Button>
            <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Toolbar>
    </AppBar>
);

export default Header;
