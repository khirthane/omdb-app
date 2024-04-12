# Use official node image as the base image
FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with nginx server
FROM nginx:latest

COPY --from=build /usr/local/app/dist/movie-app /usr/share/nginx/html
