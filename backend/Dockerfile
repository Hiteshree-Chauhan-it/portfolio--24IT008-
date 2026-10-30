# Step 1: Use an official lightweight Node.js runtime image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package definition files first (leverages Docker cache)
COPY package*.json ./

# Step 4: Install dependencies inside the container
RUN npm install

# Step 5: Copy the remaining backend application code
COPY . .

# Step 6: Expose the port the Express server listens on
EXPOSE 5000

# Step 7: Define the command to run the backend application
CMD ["npm", "start"]
