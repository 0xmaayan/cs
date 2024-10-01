FROM node:18-alpine

# Install glibc compatibility
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /usr/src/app

# Copy necessary files
COPY contract /usr/src/app/contract
COPY ./run-script.js .
COPY ./utils.js .

# Install dependencies
RUN npm install @aptos-labs/ts-sdk tree-kill

# Run the script
CMD ["node", "run-script.js", "utils.js"]