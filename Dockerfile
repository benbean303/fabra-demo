# Stage 1: Build Stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy the entire application code to the container
COPY . .

# Run Prisma generate to create the Prisma client
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine AS runner

# Set environment variables for production
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy Prisma Client (generated during the build stage)
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma

# Copy necessary files for running the app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# If you have migrations or Prisma schema, ensure they are copied
COPY --from=builder /app/prisma ./prisma

# Expose the port the app will run on
EXPOSE 3000

# Run Prisma migrations in production and start the Next.js app
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]