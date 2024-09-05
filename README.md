# Cars Market

![alt text](image-2.png)

![alt text](image-3.png)

![alt text](image.png)

## Overview

Cars Market is a comprehensive web application for browsing, searching, and managing cars. Built with React for the frontend and MongoDB + Express for the backend, it offers a modern and responsive user experience.

## Features

-   React v18 with Material-UI 5 for a sleek, responsive UI
-   React Router v6 for seamless navigation
-   MongoDB backend with Express server
-   Auto-loading of CSV data on first run (autos.csv in server folder)
-   Advanced search capabilities with rich filtering options
-   High-quality car images from Google Images
-   ES6 imports and async/await for modern JavaScript practices
-   Docker support for easy deployment and scalability
-   Prometheus monitoring integration
-   Grafana dashboard for visualizing metrics
-   Dark mode support
-   Favorites functionality
-   Car comparison feature
-   User authentication and authorization
-   Responsive design for mobile and desktop
-   Social media integration
-   Performance optimization with lazy loading and code splitting

## Project Structure

```
cars-market/
├── docker-compose.yml
├── Dockerfile
├── eslint.config.mjs
├── grafana-dashboard.json
├── landing.html
├── package.json
├── playground-1.mongodb.js
├── prometheus.yml
├── public/
│   └── index.html
├── src/
│   ├── App.css
│   ├── App.js
│   ├── index.js
│   ├── services/
│   │   └── api.js
│   ├── hooks/
│   │   ├── useCompare.js
│   │   ├── useDarkMode.js
│   │   └── useFavorites.js
│   └── components/
│       ├── CarCard.js
│       ├── CarDetails.js
│       ├── Compare.js
│       ├── Favorites.js
│       ├── Header.js
│       ├── Home.js
│       ├── Login.js
│       ├── Search.js
│       ├── SearchForm.js
│       └── Signup.js
├── server/
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   ├── models/
│   │   ├── Cars.js
│   │   └── User.js
│   └── middleware/
│       └── auth.js
└── docs/
    ├── landing_page_copy.html
    └── social_media_content.json
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Run the backend server: `cd server && npm start`

## Docker Deployment

1. Build the Docker image: `docker build -t cars-market .`
2. Run the container: `docker-compose up`

## Monitoring

-   Access Prometheus metrics at `http://localhost:9090`
-   View Grafana dashboard at `http://localhost:3000`

## Future Enhancements

-   Add a recommendation engine based on user preferences
-   Integrate a payment gateway for car reservations
-   Implement a review and rating system for cars and sellers
-   Implement progressive web app (PWA) features
-   Integrate with external APIs for additional car data and pricing information

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# TODO

-   fix Fix invalid credentials (password doesnt match) even if I send the same to /login and /register 
