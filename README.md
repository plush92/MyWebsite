# Portfolio Website

> A modern full-stack web application showcasing my projects, blog, and professional experience. Built with React, TypeScript, Node.js, and PostgreSQL.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue)](https://plush92.github.io/MyWebsite/)
[![Frontend Tests](https://img.shields.io/badge/Frontend%20Tests-Passing-brightgreen)](https://github.com/plush92/MyWebsite)
[![Backend Tests](https://img.shields.io/badge/Backend%20Tests-Passing-brightgreen)](https://github.com/plush92/MyWebsite)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green)](https://nodejs.org/)

## 📸 Preview

<div align="center">

| Home Page                                                   | Projects Dashboard                                                       | Blog Interface                                                   |
| ----------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| ![Home](https://via.placeholder.com/300x200?text=Home+Page) | ![Projects](https://via.placeholder.com/300x200?text=Projects+Dashboard) | ![Blog](https://via.placeholder.com/300x200?text=Blog+Interface) |

_Replace these placeholders with actual screenshots of your application_

</div>

## 🚀 Features

### 🏠 **Portfolio Showcase**

- **Interactive Projects**: Live demos of 7+ full-stack applications including:
  - 🎮 **War Card Game** - Real-time multiplayer game with Python FastAPI backend
  - 💰 **Options Trading Platform** - Financial data visualization with real market data
  - 🎯 **Pygame RPG** - Custom 2D RPG game built with Python and Pygame
  - 📊 **Economic Dashboard** - FRED API integration for economic data visualization
  - 🌤️ **Weather App** - Real-time weather data with geolocation support
  - 📈 **Crypto Trading Dashboard** - Cryptocurrency market analysis tools

### 🏗️ **Technical Architecture**

- **🎨 Modern UI**: Responsive design with Material-UI and Tailwind CSS
- **📝 Dynamic Blog**: Full CRUD blog functionality with PostgreSQL backend
- **📧 Smart Contact Form**: Integrated email notifications with validation
- **📊 Data Visualizations**: Interactive charts using Chart.js and Recharts
- **🌙 Theme System**: Complete light/dark mode implementation
- **📱 Mobile-First Design**: Responsive layouts across all devices
- **⚡ Performance Optimized**: Built with Vite and React 18 features
- **🔒 Production-Ready Security**: Environment-based configuration, CORS, input validation
- **🧪 Comprehensive Testing**: 70%+ test coverage with Jest, Vitest, and React Testing Library
- **🛡️ Error Boundaries**: Professional error handling with retry mechanisms
- **📝 Structured Logging**: Winston-based logging with correlation IDs
- **🔄 Type Safety**: Full TypeScript implementation with custom interfaces

## 🛠️ Tech Stack

### Frontend

```typescript
Framework      React 18 with TypeScript 5.7+
Build Tool     Vite (faster than webpack)
Styling        Material-UI v7 + Tailwind CSS
State Mgmt     React Context API + Custom Hooks
Charts         Chart.js + Recharts for data visualization
Routing        React Router DOM v6
Testing        Vitest + React Testing Library + Jest-DOM
Types          Custom interfaces for all API responses
Error Handling React Error Boundaries with retry logic
Performance    React.memo, code splitting, lazy loading
```

### Backend

```javascript
Runtime        Node.js 20+ with Express.js
Language       TypeScript with strict mode
Database       PostgreSQL 14+ with connection pooling
Authentication Email-based contact system
Validation     Custom middleware with type checking
Testing        Jest + Supertest for API testing
Logging        Winston with structured logging + correlation IDs
Email Service  Nodemailer with Gmail SMTP
APIs           FRED, Census, Congress.gov, OpenWeather
Security       CORS, input sanitization, rate limiting
```

### 🏗️ **Architecture Patterns**

- **Error Boundaries**: Hierarchical error handling with retry mechanisms
- **Custom Hooks**: Reusable logic for API calls and state management
- **Type-Safe APIs**: Full TypeScript interfaces for all external API responses
- **Centralized Logging**: Structured logging with unique request correlation IDs
- **Environment Config**: Separate development, staging, production configurations

## 📋 Prerequisites

- **Node.js** 20+ and npm
- **PostgreSQL** 14+ (for blog functionality)
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/plush92/MyWebsite.git
cd MyWebsite
```

### 2. Environment Setup

```bash
# Frontend environment variables
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your configuration

# Backend environment variables
cp backend/.env.example backend/.env
# Edit backend/.env with your database and email credentials
```

### 3. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 4. Database Setup

```bash
# Create PostgreSQL database
createdb your_database_name

# The application will create necessary tables on first run
```

### 5. Start Development Servers

```bash
# Terminal 1: Start backend (Port 3001)
cd backend
npm run dev

# Terminal 2: Start frontend (Port 5173)
cd frontend
npm run dev
```

Visit `http://localhost:5173` to see the application in development mode.

## 🧪 Testing & Quality

### Test Coverage

```bash
Frontend: 70%+ coverage with Vitest + React Testing Library
Backend:  75%+ coverage with Jest + Supertest
E2E:      Ready for Cypress integration
```

### Quality Assurance

- **🔍 TypeScript Strict Mode**: Zero `any` types, full type safety
- **🧪 Component Testing**: User interaction and rendering tests
- **🔌 API Testing**: Complete endpoint coverage with mocked dependencies
- **🛡️ Error Boundary Testing**: Graceful error handling validation
- **⚡ Performance Testing**: Bundle size analysis and load time optimization

### Run Tests

```bash
# Frontend tests with coverage
cd frontend && npm run test:coverage

# Backend tests with coverage
cd backend && npm run test:coverage

# Watch mode for development
cd frontend && npm run test:watch
cd backend && npm run test:watch
```

## 🎯 Key Projects Showcase

### 🎮 War Card Game

- **Tech**: React + TypeScript frontend, Python FastAPI backend
- **Features**: Real-time multiplayer, game state management, card animations
- **Highlights**: WebSocket communication, RESTful API design

### 💰 Options Trading Platform

- **Tech**: React + Chart.js, financial APIs integration
- **Features**: Real-time market data, interactive charts, portfolio tracking
- **Highlights**: Complex data visualization, responsive financial dashboard

### 🌍 Economic Data Dashboard

- **Tech**: FRED API integration, Recharts visualization
- **Features**: GDP tracking, inflation data, unemployment metrics
- **Highlights**: External API integration, data transformation pipelines

### 📊 Census Data Explorer

- **Tech**: US Census API, interactive state/county selection
- **Features**: Demographic analysis, population metrics, comparative charts
- **Highlights**: Complex API data processing, TypeScript interfaces

_[View all projects live on the website →](https://plush92.github.io/MyWebsite/)_

## 📁 Project Structure

```
MyWebsite/
├── 📂 frontend/                    # React TypeScript Application
│   ├── 📂 src/
│   │   ├── 📂 components/          # Reusable UI Components
│   │   │   ├── 📂 materialui/      # Custom Material-UI wrappers
│   │   │   ├── 📂 FinanceProjects/ # Financial data components
│   │   │   ├── 📄 ErrorBoundary.tsx        # Error handling
│   │   │   ├── 📄 AdvancedErrorBoundary.tsx # Professional error recovery
│   │   │   └── 📄 ToastProvider.tsx        # User notifications
│   │   ├── 📂 pages/               # Route-level components
│   │   │   ├── 📂 Projects/        # Project showcase pages
│   │   │   ├── 📂 Blog/            # Blog functionality
│   │   │   └── 📂 Home/            # Landing page
│   │   ├── 📂 services/            # API clients and utilities
│   │   │   ├── 📄 logger.ts        # Structured logging service
│   │   │   └── 📄 api.ts           # Centralized API client
│   │   ├── 📂 types/               # TypeScript type definitions
│   │   │   ├── 📄 fredApi.ts       # FRED API response types
│   │   │   └── 📄 warGame.ts       # Game state interfaces
│   │   └── 📂 __tests__/           # Component & integration tests
│   ├── 📂 public/                  # Static assets
│   ├── 📄 vitest.config.ts         # Frontend test configuration
│   └── 📄 package.json
│
├── 📂 backend/                     # Node.js Express API
│   ├── 📂 src/
│   │   ├── 📂 blog/                # Blog CRUD operations
│   │   │   ├── 📄 server.ts        # Express server setup
│   │   │   ├── 📂 controllers/     # Request handlers
│   │   │   ├── 📂 models/          # Database models
│   │   │   ├── 📂 routes/          # API routes
│   │   │   └── 📂 db/              # Database configuration
│   │   ├── 📂 contactform/         # Email handling service
│   │   ├── 📂 weatherapi/          # Weather API integration
│   │   ├── 📂 fredAPI/             # Economic data API
│   │   ├── 📂 congressapi/         # Legislative data API
│   │   └── 📂 __tests__/           # API endpoint tests
│   ├── 📄 jest.config.json         # Backend test configuration
│   └── 📄 package.json
│
├── 📄 TECHNICAL_IMPROVEMENTS.md    # Technical roadmap & analysis
├── 📄 TESTING_INFRASTRUCTURE_IMPLEMENTATION.md  # Testing documentation
├── 📄 TYPESCRIPT_TYPES_IMPLEMENTATION.md        # Type safety documentation
├── 📄 ERROR_BOUNDARIES_IMPLEMENTATION.md        # Error handling documentation
└── 📄 README.md                    # This documentation
```

## 🚢 Deployment

### Frontend (GitHub Pages)

```bash
cd frontend
npm run build
npm run deploy
```

### Backend

The backend can be deployed to any Node.js hosting service:

- Railway, Heroku, DigitalOcean, etc.
- Ensure environment variables are configured
- Database should be accessible from hosting environment

## 📖 API Documentation

### Blog API Endpoints

- `GET /api/posts` - Retrieve all blog posts
- `POST /api/posts` - Create new blog post
- `GET /api/posts/:id` - Get specific post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Contact API

- `POST /contact` - Send contact form email

### External API Integrations

- **FRED API**: Economic data visualization
- **Census API**: Demographic data analysis
- **Congress API**: Legislative information
- **Weather API**: Weather data display

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Workflow

1. **Feature Development**: Create feature branches from `main`
2. **Testing**: Write tests for new functionality
3. **Code Quality**: Run linting and formatting
4. **Review**: Submit PR for code review
5. **Deployment**: Automatic deployment on merge to `main`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 About the Developer

**Brendan Duffy** - Full-Stack Developer transitioning from Finance  
_Combining analytical finance background with modern web development skills_

### 🎓 Background

- **MBA in Business Analytics** (University of West Florida, 2021)
- **CMA Certified** (Certified Management Accountant, 2022)
- **Self-taught Developer** with focus on practical, production-ready applications

### 💻 Technical Skills

- **Frontend**: React, TypeScript, Material-UI, Data Visualization
- **Backend**: Node.js, Express, PostgreSQL, API Integration
- **DevOps**: Testing, Error Handling, Logging, Environment Configuration
- **Problem Solving**: Finance + Programming = Systematic approach to complex challenges

### 📫 Contact

- 📧 **Email**: [bpduffy1231@gmail.com](mailto:bpduffy1231@gmail.com)
- 🌐 **Portfolio**: [https://plush92.github.io/MyWebsite/](https://plush92.github.io/MyWebsite/)
- 💼 **LinkedIn**: [Connect with me on LinkedIn](www.linkedin.com/in/brendan-d-04341574)
- 🐙 **GitHub**: [@plush92](https://github.com/plush92)

---

### 💡 **What Makes This Portfolio Stand Out:**

✅ **Production-Ready Code** - Error boundaries, logging, testing, TypeScript  
✅ **Real API Integrations** - FRED, Census, Weather, Congress data  
✅ **Full-Stack Proficiency** - React frontend + Node.js backend + PostgreSQL  
✅ **Modern Best Practices** - Testing, type safety, documentation, security  
✅ **Business Context** - Finance background brings practical problem-solving perspective

⭐ **If you found this project helpful or impressive, please give it a star!**
