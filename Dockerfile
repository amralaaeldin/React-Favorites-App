# Dockerfile for React.js client
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Add these lines to handle build-time env variables
ARG VITE_SERVER_URL
ENV VITE_SERVER_URL=$VITE_SERVER_URL

# Build the React app
RUN npm run build

# Use nginx to serve the app
FROM nginx:1.23
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]