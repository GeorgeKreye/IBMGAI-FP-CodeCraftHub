### Dockerfile to containerize Node.js application ###

# Use official Node.js LTS image as base
FROM node:18-alpine

# Set working directory inside container
WORKDIR /usr/src/

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application source code
COPY . .

# Expose application port (adjust if different)
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
