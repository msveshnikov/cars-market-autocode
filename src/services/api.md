# API Service Documentation

## Overview

This file (`src/services/api.js`) contains the API service functions for the car search application. It provides methods to interact with the backend API, handling data fetching for brands, car searches, and car details. The service uses the Fetch API for HTTP requests and includes error handling with SweetAlert2 for user notifications.

## Configuration

```javascript
const API_BASE_URL = "http://localhost:5000/api";
```

The `API_BASE_URL` constant defines the base URL for all API requests. Adjust this value if your backend API is hosted at a different location.

## Functions

### fetchBrands

Fetches the list of car brands from the API.

**Parameters:** None

**Returns:** 
- `Promise<Array>`: A promise that resolves to an array of brand objects.

**Usage:**
```javascript
import { fetchBrands } from '../services/api';

const brands = await fetchBrands();
```

**Error Handling:**
- Logs errors to the console
- Displays a SweetAlert2 error message to the user
- Returns an empty array in case of an error

### searchCars

Performs a car search based on the provided parameters.

**Parameters:**
- `params` (Object): An object containing search parameters (e.g., brand, model, year)

**Returns:**
- `Promise<Object>`: A promise that resolves to an object containing:
  - `cars` (Array): An array of car objects matching the search criteria
  - `totalPages` (Number): The total number of pages of results

**Usage:**
```javascript
import { searchCars } from '../services/api';

const searchParams = { brand: 'Toyota', year: 2020 };
const { cars, totalPages } = await searchCars(searchParams);
```

**Error Handling:**
- Logs errors to the console
- Displays a SweetAlert2 error message to the user
- Returns an object with empty cars array and totalPages set to 1 in case of an error

### fetchCarDetails

Fetches detailed information for a specific car by its ID.

**Parameters:**
- `id` (String/Number): The unique identifier of the car

**Returns:**
- `Promise<Object>`: A promise that resolves to an object containing the car's detailed information

**Usage:**
```javascript
import { fetchCarDetails } from '../services/api';

const carId = '123456';
const carDetails = await fetchCarDetails(carId);
```

**Error Handling:**
- Logs errors to the console
- Displays a SweetAlert2 error message to the user
- Returns `null` in case of an error

## Error Handling

All functions in this service include error handling that:
1. Logs the error to the console for debugging purposes
2. Displays a user-friendly error message using SweetAlert2
3. Returns a fallback value to prevent application crashes

## Dependencies

- [SweetAlert2](https://sweetalert2.github.io/): Used for displaying user-friendly error messages

## Integration

This API service is designed to be used throughout the React application, particularly in components that require data fetching such as `Search.js`, `CarDetails.js`, and potentially `Home.js` for brand listings.

## Note

Ensure that the backend API is running and accessible at the specified `API_BASE_URL` for these functions to work correctly. Adjust the URL if necessary based on your development or production environment.