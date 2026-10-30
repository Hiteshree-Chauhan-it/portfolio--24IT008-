# Step 1: Use an official lightweight Node.js runtime image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package definition files first
COPY package*.json ./

# Step 4: Install dependencies inside the container
RUN npm install

# Step 5: Copy the frontend source files
COPY . .

# Step 6: Expose the port Vite development server runs on
EXPOSE 5173

# Step 7: Run Vite server binding to all network interfaces (--host 0.0.0.0)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
