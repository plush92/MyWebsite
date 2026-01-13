# Contributing Guidelines

> Welcome to the Portfolio Website project! This guide will help you contribute effectively.

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+** and npm
- **PostgreSQL 14+**
- **Git** version control
- Code editor (VS Code recommended)

### Initial Setup

```bash
# Clone and setup
git clone https://github.com/plush92/MyWebsite.git
cd MyWebsite

# Setup environment files
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
# Edit .env files with your configuration

# Install all dependencies
cd frontend && npm install
cd ../backend && npm install
```

## 🔄 Development Workflow

### 1. **Feature Development**

```bash
# Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# Make your changes...
# Commit frequently with clear messages
git add .
git commit -m "feat: add new component for user dashboard"
```

### 2. **Testing Your Changes**

```bash
# Run frontend tests
cd frontend && npm test

# Run backend tests
cd backend && npm test

# Manual testing
# Terminal 1: Start backend
cd backend && npm run dev

# Terminal 2: Start frontend
cd frontend && npm run dev
# Test at http://localhost:5173
```

### 3. **Code Quality Checks**

```bash
# Lint your code
cd frontend && npm run lint
cd backend && npm run lint  # if available

# Build to catch issues
cd frontend && npm run build
cd backend && npm run build
```

### 4. **Submit Changes**

```bash
# Push your branch
git push origin feature/your-feature-name

# Create Pull Request on GitHub
# Include description of changes and testing done
```

## 📝 Commit Message Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Feature additions
git commit -m "feat: add user authentication system"

# Bug fixes
git commit -m "fix: resolve contact form submission error"

# Documentation
git commit -m "docs: update API endpoint documentation"

# Refactoring
git commit -m "refactor: simplify database connection logic"

# Tests
git commit -m "test: add unit tests for blog controller"

# Configuration changes
git commit -m "chore: update dependencies and build config"
```

## 🧪 Testing Standards

### Required Tests for PRs

- **Unit tests** for new functions/components
- **Integration tests** for API endpoints
- **Manual testing** of user-facing changes

### Test Coverage Goals

- **Frontend**: 70%+ coverage on components and utilities
- **Backend**: 80%+ coverage on controllers and models
- **Critical paths**: 90%+ coverage on core functionality

### Writing Good Tests

```typescript
// ✅ Good: Clear, specific test names
test("should create blog post with valid title and content", () => {
  // Arrange - setup test data
  const postData = { title: "Test Post", content: "Test content" };

  // Act - perform the action
  const result = createPost(postData);

  // Assert - verify the outcome
  expect(result.status).toBe(201);
  expect(result.data.title).toBe("Test Post");
});

// ❌ Avoid: Vague test names and assertions
test("should work", () => {
  expect(something).toBeTruthy();
});
```

## 📁 Project Structure Guidelines

### Adding New Components (Frontend)

```
src/components/
├── YourComponent/
│   ├── YourComponent.tsx      # Main component
│   ├── YourComponent.test.tsx # Component tests
│   ├── index.ts               # Export file
│   └── YourComponent.styles.ts # Styled components (if needed)
```

### Adding New API Endpoints (Backend)

```
src/your-feature/
├── controllers/
│   └── yourController.ts      # Request handlers
├── models/
│   └── yourModel.ts          # Data models
├── routes/
│   └── yourRoutes.ts         # Route definitions
├── utils/
│   └── yourUtils.ts          # Helper functions
└── __tests__/
    └── your.test.ts          # Tests
```

## 🎨 Code Style Guidelines

### TypeScript Standards

```typescript
// ✅ Good: Type everything
interface User {
  id: number;
  name: string;
  email: string;
}

const createUser = (userData: Omit<User, "id">): User => {
  // Implementation...
};

// ❌ Avoid: Using 'any' or missing types
const createUser = (userData: any) => {
  // Implementation...
};
```

### React Component Guidelines

```typescript
// ✅ Good: Props interface, clear naming
interface HeaderProps {
  mode: 'light' | 'dark';
  toggleMode: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ mode, toggleMode, title }) => {
  return (
    <AppBar>
      {title && <Typography>{title}</Typography>}
      <ThemeToggle mode={mode} onToggle={toggleMode} />
    </AppBar>
  );
};

export default Header;
```

### API Controller Guidelines

```typescript
// ✅ Good: Proper error handling and types
export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, content, author } = req.body;

    // Validation
    if (!title || !content || !author) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const newPost = await postModel.insertPost(title, content, author);
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};
```

## 🚀 Performance Guidelines

### Frontend Performance

- **Code splitting**: Use dynamic imports for routes
- **Lazy loading**: Implement for images and non-critical components
- **Bundle size**: Monitor with `npm run build -- --analyze`
- **Memory leaks**: Clean up subscriptions and timers

### Backend Performance

- **Database queries**: Use indexes and limit data fetching
- **Caching**: Implement caching for expensive operations
- **Error boundaries**: Proper error handling without crashes
- **Memory management**: Avoid memory leaks in long-running processes

## 🔒 Security Guidelines

### Frontend Security

- **XSS Prevention**: Sanitize user inputs
- **Environment variables**: Never commit API keys
- **HTTPS**: Use secure connections in production
- **CSP**: Implement Content Security Policy headers

### Backend Security

- **Input validation**: Validate all user inputs
- **SQL injection**: Use parameterized queries
- **CORS**: Configure appropriate origins
- **Rate limiting**: Implement to prevent abuse

## 📖 Documentation Standards

### Code Documentation

```typescript
/**
 * Creates a new blog post with validation
 * @param postData - The post data including title, content, and author
 * @returns Promise<Post> - The created post with generated ID
 * @throws {ValidationError} When required fields are missing
 */
const createPost = async (postData: CreatePostData): Promise<Post> => {
  // Implementation...
};
```

### README Updates

- Update relevant README when adding features
- Include code examples for new APIs
- Document any new environment variables
- Add troubleshooting sections for common issues

## 🐛 Bug Report Guidelines

### Good Bug Reports Include:

1. **Clear title**: "Contact form submission fails on mobile Safari"
2. **Steps to reproduce**: Numbered list of exact steps
3. **Expected behavior**: What should happen
4. **Actual behavior**: What actually happens
5. **Environment**: OS, browser, device type
6. **Screenshots**: If UI-related

### Bug Fix Process:

1. **Reproduce** the bug locally
2. **Write a test** that exposes the bug
3. **Fix** the issue
4. **Verify** the test now passes
5. **Test** manually to ensure fix works

## 🎯 Pull Request Guidelines

### PR Checklist:

- [ ] **Tests pass**: All tests are green
- [ ] **Code builds**: No build errors
- [ ] **Documentation updated**: READMEs, comments, etc.
- [ ] **Manual testing done**: Tested the changes manually
- [ ] **Breaking changes noted**: If any APIs changed
- [ ] **Environment variables documented**: If any new ones added

### PR Description Template:

```markdown
## What Changed

Brief description of what this PR does

## Why

Explanation of why this change is needed

## Testing

How the changes were tested

## Screenshots (if UI changes)

Before/after images if applicable

## Breaking Changes

List any breaking changes

## Additional Notes

Any other context or concerns
```

## 🤝 Code Review Process

### As a Reviewer:

- **Be constructive**: Suggest improvements, don't just criticize
- **Test the changes**: Pull the branch and test locally
- **Check edge cases**: Think about what could go wrong
- **Verify tests**: Ensure new functionality is properly tested

### As an Author:

- **Respond promptly**: Address feedback quickly
- **Ask questions**: If feedback isn't clear, ask for clarification
- **Test suggestions**: Try recommended changes before pushing back
- **Update documentation**: Keep docs in sync with code changes

## 🆘 Getting Help

### Development Issues

1. **Check documentation**: README files and inline comments
2. **Search existing issues**: GitHub issues and discussions
3. **Ask questions**: Create GitHub issue or discussion
4. **Discord/Slack**: Real-time help (if available)

### Common Setup Issues

- **Node version**: Ensure Node.js 20+ is installed
- **Database connection**: Check PostgreSQL is running and accessible
- **Environment variables**: Verify all required vars are set
- **Port conflicts**: Ensure ports 3001 and 5173 are available

---

**Happy coding!** 🚀 Your contributions help make this project better for everyone.
