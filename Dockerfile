FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# -------------------------------
# 2️⃣ Copy dependencies first for caching
# -------------------------------
COPY package*.json ./

# Install dependencies (only production deps)
RUN npm install --production

# -------------------------------
# 3️⃣ Copy the rest of the app
# -------------------------------
COPY . .

# -------------------------------
# 4️⃣ Environment setup
# -------------------------------
# Expose backend port
EXPOSE 8080

# Ensure NODE_ENV is production
ENV NODE_ENV=production

# -------------------------------
# 5️⃣ Start the app
# -------------------------------
CMD ["npm", "run", "start"]
