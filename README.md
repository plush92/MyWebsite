# Portfolio Website

> A modern full-stack web application showcasing my projects, blog, and professional experience.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue)](https://plush92.github.io/MyWebsite/)
[![Frontend Tests](https://img.shields.io/badge/Frontend%20Tests-Passing-brightgreen)](https://github.com/plush92/MyWebsite)
[![Backend Tests](https://img.shields.io/badge/Backend%20Tests-Passing-brightgreen)](https://github.com/plush92/MyWebsite)

## 🚀 Features

- **🎨 Modern UI**: Responsive design with Material-UI and Tailwind CSS
- **📝 Dynamic Blog**: Full CRUD blog functionality with PostgreSQL backend
- **📧 Contact Form**: Integrated contact form with email notifications
- **📊 Data Visualizations**: Interactive charts using Chart.js and Recharts
- **🌙 Theme Toggle**: Light/dark mode support
- **📱 Responsive Design**: Mobile-first approach with responsive layouts
- **⚡ Fast Performance**: Built with Vite for optimal development and build speeds
- **🔒 Secure Configuration**: Environment-based configuration management
- **🧪 Testing Coverage**: Comprehensive test suite for both frontend and backend

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Material-UI + Tailwind CSS
- **Charts**: Chart.js, Recharts
- **Routing**: React Router DOM
- **Testing**: Vitest + React Testing Library

### Backend

- **Runtime**: Node.js with Express
- **Database**: PostgreSQL
- **Email**: Nodemailer (Gmail integration)
- **Testing**: Jest + Supertest
- **API Integration**: Multiple external APIs (FRED, Census, Congress, Weather)

### DevOps & Tools

- **Deployment**: GitHub Pages (Frontend), Node.js hosting (Backend)
- **Version Control**: Git with GitHub
- **Package Management**: npm
- **Environment Management**: dotenv
- **Code Quality**: ESLint

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

## 🧪 Testing

### Run All Tests

```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && npm test

# Run tests with coverage
cd frontend && npm run test:coverage
cd backend && npm run test:coverage
```

### Test Structure

- **Frontend**: Component tests using Vitest and React Testing Library
- **Backend**: API endpoint tests using Jest and Supertest
- **Coverage**: Targeting 70%+ coverage on core functionality

## 📁 Project Structure

```
MyWebsite/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page-level components
│   │   ├── styles/           # Theme and styling
│   │   └── __tests__/        # Test files
│   ├── public/               # Static assets
│   └── package.json
│
├── backend/                  # Node.js backend application
│   ├── src/
│   │   ├── blog/             # Blog API endpoints
│   │   ├── contactform/      # Contact form handling
│   │   ├── [api-modules]/    # Various API integrations
│   │   └── __tests__/        # Test files
│   └── package.json
│
└── README.md                 # This file
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

## 👤 Contact

**Brendan Duffy** - [bpduffy1231@gmail.com](mailto:bpduffy1231@gmail.com)

- 🌐 **Portfolio**: [https://plush92.github.io/MyWebsite/](https://plush92.github.io/MyWebsite/)
- 💼 **LinkedIn**: [Your LinkedIn Profile]
- 🐙 **GitHub**: [@plush92](https://github.com/plush92)

---

⭐ **If you found this project helpful, please give it a star!**
