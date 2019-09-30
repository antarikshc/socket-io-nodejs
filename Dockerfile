# Create image based on the official Node 10 LTS image from the DockerHub
FROM node:10-jessie

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY ./src/package.json /usr/src/app
COPY ./src/package-lock.json /usr/src/app

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY ./src/ /usr/src/app

# Expose the port the app runs in
EXPOSE 4040

# Serve the app
CMD ["npm", "start"]

# TO RUN DOCKER
# sudo docker run -p 4040:4040 -v [path-to-source-code-on-local]:/usr/src/app [image-name]