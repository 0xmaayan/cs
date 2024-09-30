# Use an official Node.js image from Docker Hub
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Create the necessary directories if needed
RUN mkdir -p /usr/src/app/contract/facoin

# Copy the 'contract' folder into the Docker image
COPY contract /usr/src/app/contract

# Install curl
RUN apk add --no-cache curl

# Install aptos ts sdk
RUN npm install @aptos-labs/ts-sdk
# Install tree-kill
RUN npm install tree-kill

# Copy your script that will use the npm package to the working directory
COPY ./run-script.js .
COPY ./utils.js .

# Command to run your script using Node.js
CMD ["node", "run-script.js", "utils.js"]