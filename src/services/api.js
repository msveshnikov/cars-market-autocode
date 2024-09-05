import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};

export const register = async (username, email, password) => {
    const response = await api.post("/register", { username, email, password });
    return response.data;
};

export const login = async (email, password) => {
    const response = await api.post("/login", { email, password });
    return response.data;
};

export const logout = async () => {
    const response = await api.post("/logout");
    return response.data;
};

export const fetchCurrentUser = async () => {
    const response = await api.get("/me");
    return response.data;
};

export const fetchCars = async (page = 1, limit = 50) => {
    const response = await api.get("/cars", { params: { page, limit } });
    return response.data;
};

export const searchCars = async (params) => {
    const response = await api.get("/search", { params });
    return response.data;
};

export const fetchCarDetails = async (id) => {
    const response = await api.get(`/cars/${id}`);
    return response.data;
};

export const fetchBrands = async () => {
    const response = await api.get("/brands");
    return response.data;
};

export const fetchModels = async (brand) => {
    const response = await api.get("/models", { params: { brand } });
    return response.data;
};

export const addToFavorites = async (carId) => {
    const response = await api.post("/favorites", { carId });
    return response.data;
};

export const getFavorites = async () => {
    const response = await api.get("/favorites");
    return response.data;
};

export const removeFromFavorites = async (carId) => {
    const response = await api.delete(`/favorites/${carId}`);
    return response.data;
};

export const addToCompare = async (carId) => {
    const response = await api.post("/compare", { carId });
    return response.data;
};

export const getCompareList = async () => {
    const response = await api.get("/compare");
    return response.data;
};

export const removeFromCompare = async (carId) => {
    const response = await api.delete(`/compare/${carId}`);
    return response.data;
};

export const toggleDarkMode = async (isDarkMode) => {
    const response = await api.post("/user/preferences", { darkMode: isDarkMode });
    return response.data;
};

export const getUserPreferences = async () => {
    const response = await api.get("/user/preferences");
    return response.data;
};

export default api;
