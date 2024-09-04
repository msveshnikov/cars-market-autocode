# Server Documentation (server/index.js)

## Overview

This file serves as the main entry point for the backend server of the Cars Market application. It sets up an Express.js server with various middleware and routes to handle car-related data operations, metrics collection, internationalization, and logging.

## Dependencies

- express: Web application framework
- mongoose: MongoDB object modeling tool
- cors: Cross-Origin Resource Sharing middleware
- csv-parser: CSV parsing library
- fs: File system module
- path: File path manipulation
- dotenv: Environment variable management
- compression: Response compression middleware
- helmet: Security headers middleware
- express-rate-limit: Rate limiting middleware
- jsdom: DOM implementation for Node.js
- prom-client: Prometheus metrics client
- i18next: Internationalization framework
- winston: Logging library
- express-winston: Express.js logging middleware

## Configuration

- The server uses environment variables for configuration (loaded via dotenv)
- MongoDB connection is established using the MONGODB_URI environment variable
- The server listens on the port specified by the PORT environment variable (default: 5000)

## Middleware

1. CORS
2. JSON parsing
3. Compression
4. Helmet (security headers)
5. Rate limiting (100 requests per 15 minutes)
6. Prometheus metrics collection
7. i18next for internationalization
8. Winston for logging

## Database Schema

The application uses a MongoDB database with a `Car` model defined by the following schema:

```javascript
const carSchema = new mongoose.Schema({
    yearofregistration: Number,
    brand: String,
    model: String,
    vehicletype: String,
    gearbox: String,
    kilometer: Number,
    powerps: Number,
    fueltype: String,
    notrepaireddamage: String,
    price: Number,
    image: String,
});
```

## API Routes

### GET /api/cars

Retrieves a paginated list of cars.

Query parameters:
- page: Page number (default: 1)
- limit: Number of items per page (default: 50)

Returns:
- cars: Array of car objects
- totalPages: Total number of pages
- currentPage: Current page number

### GET /api/search

Searches for cars based on provided filters.

Query parameters:
- page: Page number (default: 1)
- limit: Number of items per page (default: 50)
- Additional filter parameters (e.g., brand, model, yearofregistration, etc.)

Returns:
- cars: Array of car objects matching the filters
- totalPages: Total number of pages
- currentPage: Current page number

### GET /api/cars/:id

Retrieves details for a specific car by ID.

Parameters:
- id: Car ID

Returns:
- Car object

### GET /api/brands

Retrieves a list of unique car brands.

Returns:
- Array of brand names

### GET /api/models

Retrieves a list of car models for a specific brand.

Query parameters:
- brand: Brand name

Returns:
- Array of model names

## Helper Functions

### getCarImage(brand, model)

Fetches a car image URL from Google Images.

Parameters:
- brand: Car brand
- model: Car model

Returns:
- Image URL (string)

### loadCSVData()

Loads car data from a CSV file (autos.csv) into the database.

### initializeDatabase()

Initializes the database by loading CSV data if the database is empty.

## Metrics

The server exposes Prometheus metrics at the `/metrics` endpoint.

## Internationalization

The server supports internationalization using i18next, with language files located in the `locales` directory.

## Logging

Winston is used for logging, with logs stored in `error.log` and `combined.log` files.

## Usage

To start the server:

1. Ensure all dependencies are installed: `npm install`
2. Set up environment variables (e.g., MONGODB_URI, PORT)
3. Run the server: `node server/index.js`

The server will start, connect to the MongoDB database, and initialize the database if necessary.

## Project Structure

This file (`server/index.js`) is the main backend server file in the Cars Market project. It interacts with the MongoDB database and provides API endpoints for the frontend application located in the `src` directory. The frontend components in `src/components` make API calls to this server to fetch and display car data.