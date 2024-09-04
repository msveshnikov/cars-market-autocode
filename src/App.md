# App.js Documentation

## Overview

`App.js` is the main component of the React application, serving as the entry point for the user interface. It sets up the routing, theme, and global state management for the car comparison application.

## Key Components and Libraries

- React
- React Router
- Material-UI (MUI)
- Custom hooks for dark mode, favorites, and compare functionality

## Main Component: App

The `App` component is a functional component that serves as the root of the application.

### State Management

The component uses custom hooks to manage application-wide state:

- `useDarkMode()`: Manages the dark/light theme preference
- `useFavorites()`: Manages the user's favorite cars
- `useCompare()`: Manages the list of cars for comparison

### Theme Configuration

A custom theme is created using MUI's `createTheme` function, which sets up:

- Color palette (including dark mode support)
- Typography settings

### Routing

The application uses React Router for navigation, with the following routes:

- `/`: Home page
- `/search`: Search page for cars
- `/car/:id`: Individual car details page
- `/favorites`: User's favorite cars page
- `/compare`: Car comparison page

### Props Passed to Child Components

- `darkMode` and `toggleDarkMode`: For theme switching
- `favorites` and `toggleFavorite`: For managing favorite cars
- `compareList` and `toggleCompare`: For managing cars to compare

## Usage

This component is typically rendered in the root `index.js` file:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

## Project Structure Context

In the context of the project structure:

- `App.js` is located in the `src` directory, indicating it's a core part of the React application.
- It imports and uses components from the `components` directory.
- It utilizes custom hooks from the `hooks` directory for state management.
- The overall structure suggests a well-organized React application with separate concerns for components, hooks, and services.

## Dependencies

- React
- React Router DOM
- Material-UI (MUI)
- Custom hooks (`useDarkMode`, `useFavorites`, `useCompare`)

## Conclusion

`App.js` serves as the main orchestrator for the car comparison application, setting up the overall structure, theme, routing, and state management. It provides a consistent layout and passes necessary props to child components, enabling a cohesive user experience across different pages of the application.