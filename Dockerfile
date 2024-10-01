FROM --platform=linux/amd64 ubuntu:20.04

# Set working directory
WORKDIR /usr/src/app

# Update the package list and install curl, unzip, and Node.js
RUN apt-get update && \
    apt-get install -y curl unzip && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy necessary files
COPY contract /usr/src/app/contract
COPY ./run-script.js .
COPY ./utils.js .

# Install dependencies
RUN npm install @aptos-labs/ts-sdk tree-kill

# Run the script
CMD ["node", "run-script.js", "utils.js"]