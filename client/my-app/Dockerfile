# Use a base image with Node.js pre-installed
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

#  Add this line HERE
ENV NODE_OPTIONS="--localstorage-file=/tmp/localstorage.json"

# Copy package.json and yarn.lock to the working directory
COPY package.json .
COPY yarn.lock .

# Update npm to the latest version
RUN npm install -g npm@latest

# Remove existing node_modules
RUN rm -rf node_modules

# Install project dependencies
RUN npm install

# Copy all files from the current directory to the working directory in the container
COPY . .

# Expose port 3000 to allow communication to/from the container
EXPOSE 3000

# Set the entry point and default command to start the application
ENTRYPOINT [ "npm" ]
CMD ["start"]
