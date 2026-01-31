FROM node:18-alpine

WORKDIR /app

# Copy package files from backend
COPY backend/package.json ./
COPY backend/package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code from backend
COPY backend/ .

EXPOSE 4141

CMD ["node", "index.js"]
