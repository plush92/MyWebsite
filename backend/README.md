# Backend - Portfolio Website API

> Node.js/Express backend providing RESTful APIs for blog functionality, contact forms, and external data integrations

## 🏗️ Architecture

This backend follows RESTful API principles with:

- **Express.js framework** for robust HTTP server
- **PostgreSQL database** for blog post storage
- **Modular structure** with separate API modules
- **Environment-based configuration** for security
- **Comprehensive testing** with Jest

## 📁 Directory Structure

```
src/
├── blog/                # Blog API functionality
│   ├── controllers/     # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API route definitions
│   ├── db/             # Database connection and setup
│   └── utils/          # Utility functions (logger, validators)
│
├── contactform/         # Contact form email handling
├── censusapi/          # Census Bureau API integration
├── congressapi/        # Congress.gov API integration
├── fredAPI/            # Federal Reserve Economic Data API
├── weatherapi/         # Weather API integration
└── __tests__/          # Test files
```

## 🗄️ Database Schema

### Blog Posts Table

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 API Endpoints

### Blog API (`/api/posts`)

```
GET    /api/posts      # Get all blog posts
POST   /api/posts      # Create new blog post
GET    /api/posts/:id  # Get specific post by ID
PUT    /api/posts/:id  # Update existing post
DELETE /api/posts/:id  # Delete post
```

### Contact API

```
POST   /contact        # Send contact form email
```

### External API Integrations

- **FRED API**: `/fred/*` - Economic data endpoints
- **Census API**: `/census/*` - Demographic data endpoints
- **Congress API**: `/congress/*` - Legislative data endpoints
- **Weather API**: `/weather/*` - Weather data endpoints

## 🚀 Development

### Available Scripts

```bash
# Development with auto-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Environment Variables

Create `.env` file based on `.env.example`:

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
PGHOST=localhost
PGPORT=5432
PGUSER=your_db_user
PGPASSWORD=your_db_password
PGDATABASE=your_database_name

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=recipient@gmail.com

# CORS Origins (comma-separated)
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# External API Keys
FRED_API=your_fred_api_key
WEATHER_API=your_weather_api_key
CONGRESS_API=your_congress_api_key
CENSUS_API=your_census_api_key
```

## 🗄️ Database Setup

### Prerequisites

- PostgreSQL 14+ installed and running
- Database created and accessible

### Initialize Database

```bash
# Create database
createdb your_database_name

# The application will create tables automatically on first run
# Or run SQL migrations manually:
psql -d your_database_name -f src/blog/db/schema.sql
```

## 🧪 Testing Strategy

### Unit Tests

- **Controller Testing**: Test request/response handling with mocked dependencies
- **Model Testing**: Test database operations with test database
- **Utility Testing**: Test helper functions and validators

### Integration Tests

- **API Endpoint Testing**: Full request/response cycle testing
- **Database Integration**: Test actual database operations
- **External API Mocking**: Mock external service calls

### Example Test Structure

```typescript
describe("Post Controller", () => {
  test("should create new post", async () => {
    const mockPost = { title: "Test", content: "Content" };
    const result = await postController.createPost(mockReq, mockRes);
    expect(result.status).toBe(201);
  });
});
```

## 🔒 Security Features

- **CORS Configuration**: Configurable allowed origins
- **Environment Variables**: Sensitive data in environment files
- **Input Validation**: Request validation middleware
- **Error Handling**: Consistent error responses without data leakage

## 📧 Email Integration

### Gmail SMTP Setup

1. Enable 2-factor authentication on Gmail
2. Generate App Password in Google Account settings
3. Use App Password in `EMAIL_PASS` environment variable

### Contact Form Flow

```
User submits form → Validation → Email sent via Nodemailer → Response to client
```

## 🔌 External API Integrations

### FRED (Federal Reserve Economic Data)

- **Purpose**: Economic indicators and financial data
- **Endpoints**: Various economic metrics and historical data
- **Documentation**: [FRED API Docs](https://fred.stlouisfed.org/docs/api/)

### Census Bureau API

- **Purpose**: Demographic and geographic data
- **Endpoints**: Population, housing, economic census data
- **Documentation**: [Census API Docs](https://www.census.gov/developers/)

### Congress.gov API

- **Purpose**: Legislative information and voting records
- **Endpoints**: Bills, votes, member information
- **Documentation**: [Congress API Docs](https://api.congress.gov/)

## 🚢 Deployment

### Prerequisites

- Node.js 20+ runtime environment
- PostgreSQL database accessible from hosting environment
- Environment variables configured in hosting platform

### Deployment Steps

```bash
# Build the application
npm run build

# Start production server
npm start

# Or use PM2 for process management
pm2 start dist/server.js --name "portfolio-api"
```

### Hosting Platforms

- **Railway**: Easy deployment with PostgreSQL addon
- **Heroku**: Classic platform with PostgreSQL support
- **DigitalOcean**: VPS with custom PostgreSQL setup
- **Vercel**: Serverless functions (requires adaptation)

## 🐛 Troubleshooting

### Common Issues

**Database connection fails**

- Verify PostgreSQL is running
- Check connection string and credentials
- Ensure database exists

**Email sending fails**

- Verify Gmail credentials and App Password
- Check firewall/network restrictions
- Test SMTP connection separately

**External API calls fail**

- Verify API keys are valid and not expired
- Check API rate limits
- Review external service status

**Tests failing**

- Ensure test database is set up
- Check mock implementations
- Verify environment variables for tests

### Debug Mode

Set `NODE_ENV=development` for detailed error logging and stack traces.

## 📊 Monitoring & Logging

### Logging

- **Development**: Console logging with detailed information
- **Production**: Structured logging (consider adding Winston)
- **Error Tracking**: Implement error reporting (Sentry, etc.)

### Health Checks

Basic health check endpoint available at `/health` (implementation recommended)

## 🤝 Contributing

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting (recommended)

### Adding New Endpoints

1. Create route handler in appropriate module
2. Add controller function
3. Update model if database interaction needed
4. Write tests for new functionality
5. Update API documentation

- Update environment variables for your production environment.
