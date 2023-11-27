# Use an official Node.js runtime as a parent image
FROM node:20.9.0-alpine AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the application files to the working directory
COPY . .

# Build the Angular app
RUN npm run build

# Use an official Nginx image as a parent image
FROM nginx:1.21.3-alpine

# Copy the built Angular app from the build image to the nginx web root
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
