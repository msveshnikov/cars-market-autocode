# Header Component Documentation

## Overview

The `Header` component is a React functional component that renders the application's top navigation bar. It's part of the user interface for the "Cars Market" application, providing quick access to key features and navigation controls.

This component is located in `src/components/Header.js` and is likely used in the main `App.js` or a layout component to provide consistent navigation across the application.

## Dependencies

-   React
-   Material-UI components (`@mui/material`)
-   React Router (`react-router-dom`)
-   Material-UI icons (`@mui/icons-material`)

## Component Structure

The `Header` component is a stateless functional component that uses Material-UI's `AppBar` and `Toolbar` components to create a responsive navigation bar.

## Props

The component accepts two props:

-   `darkMode` (boolean): Indicates whether the application is in dark mode.
-   `toggleDarkMode` (function): A callback function to toggle the dark mode state.

## Functionality

1. **Home Button**: Links to the home page ("/").
2. **Search Button**: Links to the search page ("/search").
3. **Favorites Button**: Links to the favorites page ("/favorites").
4. **Compare Button**: Links to the compare page ("/compare").
5. **Dark Mode Toggle**: Switches between light and dark themes.

## Usage

```jsx
import Header from "./components/Header";

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <div className="App">
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            {/* Rest of the application */}
        </div>
    );
}
```

## Component Details

The `Header` component uses Material-UI's `AppBar` and `Toolbar` components to create the navigation bar structure. It includes:

-   An `IconButton` with a home icon that links to the home page.
-   A `Typography` component displaying the application title "Cars Market".
-   Three `Button` components for Search, Favorites, and Compare features, each with an associated icon and link.
-   An `IconButton` for toggling between light and dark modes, which changes its icon based on the current mode.

Each navigation item uses the `Link` component from React Router to handle client-side routing.

## Styling

The component uses Material-UI's `sx` prop for inline styling and leverages Material-UI's theming capabilities for consistent look and feel across the application.

## Integration with Project Structure

This `Header` component plays a crucial role in the application's layout and navigation:

-   It's likely rendered in the main `App.js` file or a layout component.
-   It interacts with the routing defined in the application (probably in `App.js` or a separate router file).
-   The dark mode functionality likely uses the `useDarkMode` hook located in `src/hooks/useDarkMode.js`.
-   The navigation buttons correspond to other main components in the `src/components` directory (Home, Search, Favorites, Compare).

## Conclusion

The `Header` component provides a consistent and accessible navigation interface for the Cars Market application, integrating key features like search, favorites, and comparison tools, while also offering a dark mode toggle for user preference.
