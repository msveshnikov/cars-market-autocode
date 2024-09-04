import { useState, useEffect } from "react";

export const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const toggleFavorite = (car) => {
        const newFavorites = favorites.some((fav) => fav._id === car._id)
            ? favorites.filter((fav) => fav._id !== car._id)
            : [...favorites, car];
        setFavorites(newFavorites);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    };

    return [favorites, toggleFavorite];
};
