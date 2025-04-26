#!/bin/sh

# Wait for db to be ready
echo "⏳ Waiting for Postgres to be ready..."

while ! nc -z db 5432; do
  sleep 1
done

echo "✅ Postgres is ready! Running migrations..."

# Push drizzle migrations
npm run drizzle:push

# Start the app
echo "🚀 Starting Next.js app..."
npm run start
