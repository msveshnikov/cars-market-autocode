import { useState, useEffect } from "react";

export const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem("darkMode");
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        document.body.classList.toggle("dark-mode", darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

    return [darkMode, toggleDarkMode];
};
