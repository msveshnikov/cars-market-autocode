import Swal from "sweetalert2";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchBrands = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/brands`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching brands:", error);
        Swal.fire("Error", "Failed to fetch brands. Please try again later.", "error");
        return [];
    }
};

export const searchCars = async (params) => {
    try {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${API_BASE_URL}/search?${queryString}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching search results:", error);
        Swal.fire("Error", "Failed to fetch search results. Please try again later.", "error");
        return { cars: [], totalPages: 1 };
    }
};

export const fetchCarDetails = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cars/${id}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching car details:", error);
        Swal.fire("Error", "Failed to fetch car details. Please try again later.", "error");
        return null;
    }
};
