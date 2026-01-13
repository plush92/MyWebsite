#!/bin/bash

echo "🚀 Starting Portfolio Website with Claude Sonnet 4.5 Enabled"
echo "=========================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the root project directory"
    exit 1
fi

echo -e "${BLUE}📦 Installing dependencies...${NC}"

# Install frontend dependencies
echo -e "${YELLOW}Installing frontend dependencies...${NC}"
cd frontend
npm install
cd ..

# Install backend dependencies  
echo -e "${YELLOW}Installing backend dependencies...${NC}"
cd backend
npm install
cd ..

echo -e "${GREEN}✅ Dependencies installed!${NC}"

# Check if .env files exist
echo -e "${BLUE}🔧 Checking environment configuration...${NC}"

if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}Creating frontend .env from example...${NC}"
    cp frontend/.env.example frontend/.env
fi

if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}Creating backend .env from example...${NC}"
    cp backend/.env.example backend/.env
fi

echo -e "${GREEN}✅ Environment files ready!${NC}"

echo -e "${BLUE}🔑 Claude Sonnet 4.5 Configuration:${NC}"
echo "To enable Claude Sonnet 4.5:"
echo "1. Get your Anthropic API key from: https://console.anthropic.com/"
echo "2. Add it to backend/.env: ANTHROPIC_API_KEY=your_key_here"
echo "3. Add it to frontend/.env: VITE_ANTHROPIC_API_KEY=your_key_here"
echo "4. Make sure ENABLE_CLAUDE_SONNET_4_5=true in both files"
echo ""

# Start the servers
echo -e "${BLUE}🚀 Starting development servers...${NC}"

# Function to start backend
start_backend() {
    echo -e "${YELLOW}Starting backend server on port 3001...${NC}"
    cd backend
    npm run build && npm start &
    BACKEND_PID=$!
    cd ..
}

# Function to start frontend
start_frontend() {
    echo -e "${YELLOW}Starting frontend server on port 5173...${NC}"
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
}

# Start both servers
start_backend
sleep 3
start_frontend

echo -e "${GREEN}✅ Both servers started!${NC}"
echo ""
echo -e "${BLUE}📍 Access your application:${NC}"
echo "• Frontend: http://localhost:5173"
echo "• Backend API: http://localhost:3001"
echo "• AI Test Page: http://localhost:5173/ai-test"
echo ""
echo -e "${YELLOW}💡 Claude Sonnet 4.5 Status:${NC}"
echo "• Check http://localhost:3001/api/ai/status for AI configuration"
echo "• Visit Projects → AI Assistant to test Claude integration"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait