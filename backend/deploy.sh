#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Load environment variables
if [ -f .env.production ]; then
    export $(cat .env.production | grep -v '^#' | xargs)
    echo "✅ Loaded production environment variables"
else
    echo "❌ Production environment file not found"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# Run database migrations if any
if [ -d "./migrations" ]; then
    echo "🔄 Running database migrations..."
    npm run migrate
fi

# Build the application if needed
if [ -f "package.json" ] && grep -q "build" "package.json"; then
    echo "🏗️ Building application..."
    npm run build
fi

# Run tests
echo "🧪 Running tests..."
npm test

# Start PM2 process
echo "🚀 Starting application with PM2..."
pm2 delete ravion-backend || true
pm2 start src/app.js --name "ravion-backend" \
    --max-memory-restart 1G \
    --log ./logs/pm2/app.log \
    --error ./logs/pm2/error.log \
    --time \
    --node-args="--max-old-space-size=1536" \
    --env production

# Save PM2 process list
pm2 save

echo "✅ Deployment completed successfully!"

# Health check
echo "🏥 Performing health check..."
sleep 5
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:${PORT}/health)

if [ $response -eq 200 ]; then
    echo "✅ Health check passed!"
else
    echo "❌ Health check failed! HTTP Status: $response"
    exit 1
fi 