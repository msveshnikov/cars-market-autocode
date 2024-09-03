# Cars Market (built by [AutoCode](https://autocode.work) in 20 minutes)

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
├── docker-compose.yml
├── Dockerfile
├── grafana-dashboard.json
├── landing.html
├── package.json
├── prometheus.yml
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   └── useInput.js
└── server/
    ├── index.js
    └── package.json
```

## TODO

-   Remove unsplash and implelent car pictures via API from (Google search scraping)
-   Implement user authentication and authorization system
