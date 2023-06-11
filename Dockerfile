# Use official node 14 image as base
FROM node:14
# Set working dir
WORKDIR /app
# Copy package and package lock files
COPY package.json package-lock.json ./
# Install packages/dependencies using npm
RUN npm install
# Copy rest of project
COPY . .
# Expose port 3000 since server is listening on that pot
EXPOSE 3000
# Run command to start server
CMD [ "node", "server.js" ]