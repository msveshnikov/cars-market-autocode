# Search Component Documentation

## Overview

The `Search` component is a crucial part of the car search application. It provides a user interface for searching cars, displaying search results, and managing pagination. This component integrates with other parts of the application, such as favorites and comparison features.

## File Location

`src/components/Search.js`

## Dependencies

- React
- Material-UI components
- SearchForm component
- CarCard component
- API services (fetchBrands, searchCars)
- SweetAlert2 for error notifications

## Component Structure

The `Search` component is a functional component that uses React hooks for state management and side effects.

## State Variables

- `searchParams`: Object storing the current search parameters
- `searchResults`: Array of car objects returned from the search
- `brands`: Array of available car brands
- `loading`: Boolean indicating if a search is in progress
- `page`: Current page number of search results
- `totalPages`: Total number of pages available for the current search

## Effects

- Fetches the list of car brands on component mount

## Main Functions

### `handleSearch(params, pageNumber = 1)`

Performs a car search based on the given parameters and page number.

**Parameters:**
- `params`: Object containing search criteria
- `pageNumber`: (Optional) Page number to fetch, defaults to 1

**Behavior:**
1. Sets loading state to true
2. Calls the `searchCars` API with the provided parameters
3. Updates the component state with the search results
4. Handles errors and displays an error message if the search fails
5. Sets loading state to false when completed

### `handlePageChange(event, value)`

Handles pagination changes.

**Parameters:**
- `event`: Event object (unused)
- `value`: New page number

**Behavior:**
Calls `handleSearch` with the current search parameters and the new page number

## Render Output

The component renders:
1. A title "Search Cars"
2. The `SearchForm` component for inputting search criteria
3. A loading message when a search is in progress
4. A grid of `CarCard` components displaying search results
5. Pagination controls for navigating through search results

## Props

- `favorites`: Array of favorite car objects
- `toggleFavorite`: Function to toggle a car's favorite status
- `compareList`: Array of cars in the comparison list
- `toggleCompare`: Function to toggle a car's compare status

## Usage Example

```jsx
import Search from './components/Search';

function App() {
  // ... other app logic and state management

  return (
    <div className="App">
      <Search 
        favorites={favorites}
        toggleFavorite={handleToggleFavorite}
        compareList={compareList}
        toggleCompare={handleToggleCompare}
      />
    </div>
  );
}
```

## Integration with Project

This component is central to the car search functionality of the application. It interacts with:

- The API service (`src/services/api.js`) for fetching data
- Custom hooks for managing favorites and comparisons
- Other components like `SearchForm` and `CarCard` for UI composition

The `Search` component would typically be rendered as part of the main application layout, possibly as a route in a React Router setup.