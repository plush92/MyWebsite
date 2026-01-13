# Frontend - Portfolio Website

> React frontend application built with Vite, TypeScript, and Material-UI

## 🏗️ Architecture

This frontend follows modern React patterns with:

- **Component-based architecture** with reusable UI components
- **Type-safe development** using TypeScript
- **State management** with React hooks
- **Responsive design** using Material-UI and Tailwind CSS
- **Performance optimization** with Vite's fast bundling

## 📁 Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── materialui/      # Custom Material-UI wrapper components
│   ├── FinanceProjects/ # Finance-related project components
│   └── __tests__/       # Component tests
├── pages/               # Page-level components and routing
│   ├── Home/           # Homepage components
│   ├── Blog/           # Blog functionality
│   ├── Contact/        # Contact form and components
│   └── Projects/       # Project showcase pages
├── styles/             # Theme configuration and global styles
├── types/              # TypeScript type definitions
└── assets/             # Static assets (images, etc.)
```

## 🎨 Component Library

### Core Components

- **Header**: Navigation with theme toggle
- **Footer**: Site footer with links
- **ThemeToggle**: Light/dark mode switcher
- **PageLayout**: Consistent page wrapper

### Material-UI Wrappers

Custom components that extend Material-UI with consistent styling:

- `CustomAppBar`, `CustomButton`, `CustomCard`
- `CustomTextField`, `CustomDatePicker`
- `CustomDrawer`, `CustomContainer`

## 🚀 Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Generate test coverage report
npm run test:coverage

# Lint code
npm run lint
```

### Environment Variables

Create `.env` file based on `.env.example`:

```bash
# API Configuration
VITE_API_URL=http://localhost:3001
VITE_BACKEND_URL=http://localhost:3001

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=true
```

## 🧪 Testing Strategy

### Component Testing

- **Testing Library**: React Testing Library for user-centric tests
- **Test Runner**: Vitest for fast, modern testing
- **Coverage**: Focus on user interactions and component behavior

### Example Test Structure

```typescript
describe('Header Component', () => {
  test('renders navigation elements', () => {
    render(<Header mode="light" toggleMode={mockFn} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
```

## 🎯 Performance Optimizations

- **Code Splitting**: Dynamic imports for route-based splitting
- **Tree Shaking**: Unused code elimination via Vite
- **Image Optimization**: Responsive images and lazy loading
- **Bundle Analysis**: Use `npm run build -- --analyze` to inspect bundle

## 🌐 Deployment

### GitHub Pages Deployment

```bash
npm run build
npm run deploy
```

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to your hosting service
```

## 🔧 Configuration Files

- **`vite.config.js`**: Vite build configuration
- **`tailwind.config.js`**: Tailwind CSS customization
- **`vitest.config.ts`**: Testing configuration
- **`tsconfig.json`**: TypeScript compiler options

## 🎨 Theming

The application supports light/dark themes using Material-UI's theming system:

```typescript
// Theme configuration in src/theme.ts
const theme = createTheme({
  palette: {
    mode: 'light' | 'dark',
    // Custom color palette
  },
});
```

## 📱 Responsive Design

- **Mobile-first approach** with progressive enhancement
- **Breakpoints**: Following Material-UI standard breakpoints
- **Flexible layouts**: CSS Grid and Flexbox for responsive components

## 🐛 Troubleshooting

### Common Issues

**Build fails with environment variable errors**

- Ensure all `VITE_` prefixed variables are defined in `.env`
- Check `src/vite-env.d.ts` for type definitions

**Tests failing**

- Run `npm test -- --run` for single run
- Check mock implementations in test files

**Development server won't start**

- Verify Node.js version (20+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
