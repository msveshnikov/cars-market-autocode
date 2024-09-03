# Cars Market Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Module Interactions](#module-interactions)
7. [Monitoring and Analytics](#monitoring-and-analytics)
8. [Future Enhancements](#future-enhancements)

## Project Overview

Cars Market is a modern web application designed for browsing and searching cars. It provides users with a seamless experience to explore various car listings, leveraging advanced search capabilities and high-quality images. The project combines a React-based frontend with a MongoDB and Express backend, offering a robust and scalable solution for car enthusiasts and potential buyers.

## Architecture

The Cars Market project follows a microservices architecture, containerized using Docker for easy deployment and scalability. The main components are:

1. **Frontend**: A React application using Material-UI for the user interface.
2. **Backend**: An Express.js server handling API requests and business logic.
3. **Database**: MongoDB for storing car listings and user data.
4. **Monitoring**: Prometheus for metrics collection and Grafana for visualization.

The application is containerized using Docker, with services defined in the `docker-compose.yml` file for easy deployment and scaling.

## Features

- Modern, responsive UI built with React v18 and Material-UI 5
- Seamless navigation using React Router v6
- Advanced search capabilities with rich filtering options
- High-quality car images sourced from Google Images
- Auto-loading of CSV data on first run (from `autos.csv` in the server folder)
- Monitoring and analytics with Prometheus and Grafana
- Containerized deployment using Docker

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/cars-market.git
   cd cars-market
   ```

2. Install dependencies for both frontend and backend:
   ```
   npm install
   cd server && npm install && cd ..
   ```

3. Ensure Docker and Docker Compose are installed on your system.

4. Build and start the Docker containers:
   ```
   docker-compose up --build
   ```

## Usage

After installation, the application will be accessible at `http://localhost:3000`. The main features include:

- Browsing car listings on the homepage
- Using the search bar to find specific cars
- Applying filters to refine search results
- Viewing detailed information about each car

For developers:
- The React development server runs on port 3000
- The Express backend API is available on port 5000
- MongoDB runs on the standard port 27017
- Prometheus is accessible on port 9090
- Grafana dashboards can be viewed on port 3001

## Module Interactions

1. **Frontend (React) -> Backend (Express)**: 
   - The React frontend makes API calls to the Express backend to fetch car listings, perform searches, and apply filters.

2. **Backend (Express) -> Database (MongoDB)**:
   - The Express server interacts with MongoDB to store and retrieve car data.

3. **CSV Data Loading**:
   - On first run, the backend automatically loads car data from the `autos.csv` file into the MongoDB database.

4. **Monitoring Flow**:
   - Prometheus scrapes metrics from the application
   - Grafana visualizes these metrics using the pre-configured dashboard

## Monitoring and Analytics

The project includes a comprehensive monitoring setup:

- Prometheus collects metrics from the application
- Grafana provides visualization through a pre-configured dashboard (`grafana-dashboard.json`)
- Key metrics include:
  - HTTP request rate
  - MongoDB current connections
  - CPU usage
  - Memory usage

To access the Grafana dashboard, navigate to `http://localhost:3001` after starting the application.

## Future Enhancements

1. Implement car pictures via API from Google search scraping, replacing Unsplash.
2. Optimize search functionality to trigger only after 3 seconds of typing.
3. Enhance user authentication and authorization.
4. Implement user reviews and ratings for cars.
5. Add a recommendation system based on user preferences and browsing history.

---

This documentation provides a comprehensive overview of the Cars Market project. For any additional information or support, please contact the development team or refer to the inline comments in the source code.