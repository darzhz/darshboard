# Use official Node.js image
FROM node:22

# Set working directory
WORKDIR /app

# Install system dependencies including netcat
RUN apt-get update && apt-get install -y \
  build-essential \
  python3 \
  netcat-traditional \
  && rm -rf /var/lib/apt/lists/*

# Copy package files and install deps
COPY package.json package-lock.json ./
RUN npm install --force

# Copy rest of the project
COPY . .

# Copy docker-specific env
COPY .env.docker .env

# Build Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set entrypoint
ENTRYPOINT ["/entrypoint.sh"]
