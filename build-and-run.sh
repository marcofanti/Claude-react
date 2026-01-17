#!/bin/bash

# Build and run Auth0 React App in Docker
# This script builds the Docker image and runs the container on port 8080

set -e  # Exit on error

# Configuration
IMAGE_NAME="auth0-react-app"
CONTAINER_NAME="auth0-react-app-container"
PORT=8080

echo "🚀 Building Docker image: $IMAGE_NAME"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Load environment variables from .env file
if [ -f "auth0-react-app/.env" ]; then
  echo "📋 Loading Auth0 configuration from .env file..."
  set -a
  source auth0-react-app/.env
  set +a
  echo "   VITE_AUTH0_DOMAIN: $VITE_AUTH0_DOMAIN"
  echo "   VITE_AUTH0_CLIENT_ID: ${VITE_AUTH0_CLIENT_ID:0:10}..."
else
  echo "⚠️  Warning: .env file not found. Using default values."
fi

# Build the Docker image with build arguments
docker build \
  --build-arg VITE_AUTH0_DOMAIN="$VITE_AUTH0_DOMAIN" \
  --build-arg VITE_AUTH0_CLIENT_ID="$VITE_AUTH0_CLIENT_ID" \
  -t "$IMAGE_NAME" .

echo ""
echo "✅ Docker image built successfully!"
echo ""
echo "🧹 Stopping and removing existing container (if any)..."

# Stop and remove existing container if it exists
docker stop "$CONTAINER_NAME" 2>/dev/null || true
docker rm "$CONTAINER_NAME" 2>/dev/null || true

echo ""
echo "🐳 Running Docker container: $CONTAINER_NAME"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Run the container
docker run -d \
  --name "$CONTAINER_NAME" \
  -p "$PORT:8080" \
  "$IMAGE_NAME"

echo ""
echo "✅ Container is running!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Container Information:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🌐 Application URL: http://localhost:$PORT"
echo "  🐳 Container Name:  $CONTAINER_NAME"
echo "  📦 Image Name:      $IMAGE_NAME"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 Useful Commands:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  View logs:     docker logs -f $CONTAINER_NAME"
echo "  Stop container: docker stop $CONTAINER_NAME"
echo "  Remove container: docker rm $CONTAINER_NAME"
echo "  Shell access:  docker exec -it $CONTAINER_NAME sh"
echo ""
echo "🎉 Setup complete! Open http://localhost:$PORT in your browser."
