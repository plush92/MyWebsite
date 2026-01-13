// Import testing utilities
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Header from '../Header';

// Mock the ThemeToggle component since we're only testing Header
vi.mock('../ThemeToggle', () => ({
  default: ({ mode, toggleMode }: { mode: string; toggleMode: () => void }) => (
    <button data-testid="theme-toggle" onClick={toggleMode}>
      Toggle to {mode === 'light' ? 'dark' : 'light'}
    </button>
  ),
}));

// Group related tests together
describe('Header Component', () => {
  // Create a mock function to test if our prop is called correctly
  const mockToggleMode = vi.fn();

  // Test 1: Basic rendering test
  test('renders header component', () => {
    // Render the component with props
    render(<Header mode="light" toggleMode={mockToggleMode} />);

    // Check if the component renders without crashing
    const header = screen.getByRole('banner'); // AppBar has 'banner' role
    expect(header).toBeInTheDocument();
  });

  // Test 2: Check if ThemeToggle is rendered
  test('renders theme toggle button', () => {
    render(<Header mode="light" toggleMode={mockToggleMode} />);

    // Look for our mocked theme toggle
    const themeToggle = screen.getByTestId('theme-toggle');
    expect(themeToggle).toBeInTheDocument();
  });

  // Test 3: Check if props are passed correctly
  test('passes correct mode to ThemeToggle', () => {
    render(<Header mode="dark" toggleMode={mockToggleMode} />);

    const themeToggle = screen.getByTestId('theme-toggle');
    expect(themeToggle).toHaveTextContent('Toggle to light');
  });

  // Test 4: Check the header styling
  test('has correct background color', () => {
    render(<Header mode="light" toggleMode={mockToggleMode} />);

    const header = screen.getByRole('banner');
    expect(header).toHaveStyle({ backgroundColor: '#102542' });
  });
});
