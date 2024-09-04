# Docker Compose Configuration Documentation

## Overview

This `docker-compose.yml` file defines the multi-container Docker application for a car marketplace project. It orchestrates several services including the main application, backend server, MongoDB database, Prometheus for monitoring, and Grafana for visualization.

## Services

### app

The main application service, likely a React frontend.

- **Build**: Uses the Dockerfile in the root directory
- **Port**: Exposes port 3000
- **Environment**:
  - `NODE_ENV=production`
- **Dependencies**: Depends on `server` and `mongo` services

### server

The backend server service.

- **Build**: Uses the Dockerfile in the `./server` directory
- **Port**: Exposes port 5000
- **Environment**:
  - `NODE_ENV=production`
  - `MONGO_URI=mongodb://mongo:27017/cars_market`
- **Dependencies**: Depends on `mongo` service
- **Volumes**: Mounts `./server/autos.csv` to `/app/autos.csv` in the container

### mongo

MongoDB database service.

- **Image**: Uses the latest MongoDB image
- **Volumes**: Persists data in the `mongo-data` volume
- **Port**: Exposes port 27017

### prometheus

Prometheus monitoring service.

- **Image**: Uses the latest Prometheus image
- **Volumes**: Mounts `./prometheus.yml` to `/etc/prometheus/prometheus.yml` in the container
- **Port**: Exposes port 9090

### grafana

Grafana visualization service.

- **Image**: Uses the latest Grafana image
- **Volumes**: Mounts `./grafana-dashboard.json` to `/etc/grafana/provisioning/dashboards/dashboard.json` in the container
- **Port**: Exposes port 3001 (mapped to internal port 3000)
- **Dependencies**: Depends on `prometheus` service

## Volumes

- **mongo-data**: Persistent volume for MongoDB data

## Usage

To start the entire application stack:

```bash
docker-compose up -d
```

To stop and remove all containers:

```bash
docker-compose down
```

## Project Context

This `docker-compose.yml` file is the central configuration for deploying the car marketplace application. It coordinates:

1. The main React application (`app` service)
2. The backend server (`server` service)
3. The MongoDB database (`mongo` service)
4. Monitoring with Prometheus (`prometheus` service)
5. Visualization with Grafana (`grafana` service)

The file structure shows a typical React application setup with a separate server directory, suggesting a decoupled frontend and backend architecture. The inclusion of Prometheus and Grafana indicates a focus on application monitoring and performance visualization.

## Notes

- Ensure all referenced files (`Dockerfile`, `server/Dockerfile`, `prometheus.yml`, `grafana-dashboard.json`) exist in the correct locations.
- The `autos.csv` file in the server directory is mounted into the server container, likely for data import or processing.
- Environment variables and port mappings can be adjusted as needed for different deployment scenarios.
- The MongoDB connection string is hardcoded in the server service environment variables. For production use, consider using Docker secrets or environment files for sensitive information.