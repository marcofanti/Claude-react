# Multi-stage build for Auth0 React App

# Stage 1: Build the application
FROM node:20-alpine AS builder

# Build arguments for Auth0 configuration
ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CLIENT_ID

# Set environment variables from build args
ENV VITE_AUTH0_DOMAIN=$VITE_AUTH0_DOMAIN
ENV VITE_AUTH0_CLIENT_ID=$VITE_AUTH0_CLIENT_ID

WORKDIR /app

# Copy package files
COPY auth0-react-app/package*.json ./

# Install dependencies
RUN npm ci

# Copy source code (excluding .env file for security)
COPY auth0-react-app/ ./

# Build the application
RUN npm run build

# Stage 2: Serve the application with Node.js
FROM node:20-alpine

WORKDIR /app

# Install serve package globally
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose port 8080
EXPOSE 8080

# Serve the application
CMD ["serve", "-s", "dist", "-l", "8080"]
