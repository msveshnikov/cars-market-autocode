# Cars Market

## Overview

Cars Market is a web application for browsing and searching cars. It utilizes React for the frontend and a MongoDB + Express backend.

## Features

-   React v18 with Material-UI 5 for a modern, responsive UI
-   React Router v6 for seamless navigation
-   MongoDB backend with Express server
-   Auto-loading of CSV data on first run (autos.csv in server folder)
-   Advanced search capabilities with rich filtering options
-   High-quality car images from Google Images
-   Use only ES6 imports and async/await, no axios

## Project Structure

```
cars-market/
├── package.json
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   └── useInput.js
└── server/
    └── package.json
```

## Future Enhancements

2. Add favorites and comparison features
3. Integrate real-time updates for new listings
4. Implement a recommendation system based on user preferences
5. Add pagination or infinite scrolling for large result sets
6. Implement caching strategies for improved performance
7. Add a dark mode theme option
8. Integrate with external APIs for additional car data (e.g., reviews, specifications)

## Getting Started

1. Clone the repository
2. Install dependencies for both client and server
3. Set up MongoDB and configure connection
4. Run the server and client applications

# TODO

-   load autos.csv in server folder to Mongo DB on first run
-   fix ERROR in ./src/App.js 673:41-47 export 'Switch' (imported as 'Switch') was not found in 'react-router-dom' (