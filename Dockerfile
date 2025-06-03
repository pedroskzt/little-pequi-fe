# Use Node.js slim image as the base for the build stage
FROM node:20.10.0-slim AS build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
# Install all dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application with access to the backend URL secret
# The secret is mounted during build time and available as an environment variable
RUN --mount=type=secret,id=VITE_BACKEND_URL,env=VITE_BACKEND_URL \
    npm run build

# Start a new stage using nginx alpine image for production
FROM nginx:stable-alpine AS production-stage

# Remove the default nginx configuration file
RUN rm -rf /etc/nginx/conf.d/default.conf
# Copy our custom nginx configuration
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the built application from build-stage to nginx html directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Set working directory to nginx serve directory
WORKDIR /usr/share/nginx/html
