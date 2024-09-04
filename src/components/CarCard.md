# CarCard Component Documentation

## Overview

The `CarCard` component is a React functional component that renders a card displaying information about a car. It's part of a larger car marketplace application, located in `src/components/CarCard.js`. This component is likely used in various parts of the application where car listings are displayed, such as search results or browsing pages.

## Component Structure

The component uses Material-UI (MUI) components for styling and layout. It displays car information including an image, brand, model, price, year, and mileage. It also includes buttons for viewing details, adding to favorites, and comparing cars.

## Props

The `CarCard` component accepts the following props:

- `car` (Object): Contains details about the car to be displayed.
- `isFavorite` (Boolean): Indicates whether the car is marked as a favorite.
- `isCompare` (Boolean): Indicates whether the car is selected for comparison.
- `onToggleFavorite` (Function): Callback function to toggle the favorite status of the car.
- `onToggleCompare` (Function): Callback function to toggle the comparison status of the car.

## Component Breakdown

### Car Image
```jsx
<CardMedia
    component="img"
    height="160"
    image={car.image || `https://via.placeholder.com/300x200.png?text=${car.brand}+${car.model}`}
    alt={`${car.brand} ${car.model}`}
/>
```
Displays the car image. If no image is provided, it uses a placeholder image with the car's brand and model as text.

### Car Information
```jsx
<CardContent>
    <Typography variant="h6" component="div">
        {car.brand} {car.model}
    </Typography>
    <Typography variant="body2" color="text.secondary">
        Price: {Math.round(car.price)} EUR
    </Typography>
    <Typography variant="body2" color="text.secondary">
        Year: {car.yearofregistration}
    </Typography>
    <Typography variant="body2" color="text.secondary">
        Mileage: {car.kilometer} km
    </Typography>
    ...
</CardContent>
```
Displays the car's brand, model, price (rounded to the nearest integer), year of registration, and mileage.

### Action Buttons
```jsx
<Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
    <Button variant="outlined" size="small" component={Link} to={`/car/${car._id}`}>
        View Details
    </Button>
    <IconButton onClick={onToggleFavorite} color={isFavorite ? "secondary" : "default"}>
        <FavoriteIcon />
    </IconButton>
    <IconButton onClick={onToggleCompare} color={isCompare ? "primary" : "default"}>
        <CompareArrowsIcon />
    </IconButton>
</Box>
```
Includes three action buttons:
1. "View Details": Links to the detailed view of the car.
2. Favorite toggle: Allows adding/removing the car from favorites.
3. Compare toggle: Allows adding/removing the car from comparison.

## Usage Example

```jsx
import CarCard from './components/CarCard';

function CarListing({ cars, favorites, comparisons }) {
  return (
    <div>
      {cars.map(car => (
        <CarCard
          key={car._id}
          car={car}
          isFavorite={favorites.includes(car._id)}
          isCompare={comparisons.includes(car._id)}
          onToggleFavorite={() => handleToggleFavorite(car._id)}
          onToggleCompare={() => handleToggleCompare(car._id)}
        />
      ))}
    </div>
  );
}
```

## Dependencies

- React
- Material-UI components
- react-router-dom (for the Link component)

## Notes

- The component uses Material-UI's theming system for consistent styling across the application.
- It integrates with the application's routing system for the "View Details" link.
- The favorite and compare functionalities likely integrate with global state management (e.g., Redux, Context API) or custom hooks (`useFavorites`, `useCompare`) as seen in the project structure.

This component plays a crucial role in presenting car information in a concise and interactive format, allowing users to quickly view key details and perform actions like favoriting or comparing cars.