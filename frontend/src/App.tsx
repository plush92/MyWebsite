import React, { useState } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import CustomBox from './components/materialui/CustomBox';
import AppThemeProvider from './ThemeProvider';

// Error Boundary and Toast components
import ErrorBoundary from './components/ErrorBoundary';
import AdvancedErrorBoundary from './components/AdvancedErrorBoundary';
import ToastProvider, {
  setToastInstance,
  useToast,
} from './components/ToastProvider';

import Footer from './components/Footer';

import Weather from './pages/Projects/OtherProjects/weather/Weather';
import InputTracker from './pages/Projects/OtherProjects/inputtracker/InputTracker';
import MoodTracker from './pages/Projects/OtherProjects/moodtracker/MoodTracker';
import PygameRPG from './pages/Projects/PygameRPG/PygameRPG';
import OptionsPlatform from './pages/Projects/OptionsPlatform/OptionsPlatform';
import WarGameWrapper from './pages/Projects/War/WarGameWrapper';
import CryptoDashboard from './pages/Projects/OtherProjects/Crypto/CryptoTrader';
import AITestComponent from './components/AITestComponent';

import Contact from './pages/Contact/Contact';
import Projects from './pages/Projects/Projects';
import Home from './pages/Home/Home';
import Blog from './pages/Blog/Blog';

// Component to set up toast instance for use in error boundaries
const AppContent: React.FC<{
  mode: 'light' | 'dark';
  toggleMode: () => void;
}> = ({ mode, toggleMode }) => {
  const toastInstance = useToast();

  // Set toast instance for use in error boundaries and other places
  React.useEffect(() => {
    setToastInstance(toastInstance);
  }, [toastInstance]);

  // Error handler for logging errors to external services
  const handleError = (
    error: Error,
    errorInfo: React.ErrorInfo,
    eventId: string
  ) => {
    console.error('Application Error:', { error, errorInfo, eventId });
    toastInstance.showError(`Application error occurred. Error ID: ${eventId}`);

    // In production, you'd send this to an error reporting service
    // errorReportingService.captureException(error, { errorInfo, eventId });
  };

  return (
    <CustomBox
      className="app-container"
      sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <CustomBox component="main" className="content" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Home page with advanced error boundary */}
          <Route
            path="/home"
            element={
              <AdvancedErrorBoundary
                name="Home Page"
                onError={handleError}
                maxRetries={2}
              >
                <Home mode={mode} toggleMode={toggleMode} />
              </AdvancedErrorBoundary>
            }
          />

          {/* Contact page with error boundary */}
          <Route
            path="/contact"
            element={
              <ErrorBoundary
                onError={(error, errorInfo) =>
                  console.error('Contact page error:', error, errorInfo)
                }
              >
                <Contact mode={mode} toggleMode={toggleMode} />
              </ErrorBoundary>
            }
          />

          {/* Projects page with advanced error boundary */}
          <Route
            path="/projects"
            element={
              <AdvancedErrorBoundary
                name="Projects Page"
                onError={handleError}
                maxRetries={3}
              >
                <Projects mode={mode} toggleMode={toggleMode} />
              </AdvancedErrorBoundary>
            }
          />

          {/* Blog page with advanced error boundary */}
          <Route
            path="/blog"
            element={
              <AdvancedErrorBoundary
                name="Blog Page"
                onError={handleError}
                maxRetries={2}
              >
                <Blog mode={mode} toggleMode={toggleMode} />
              </AdvancedErrorBoundary>
            }
          />

          {/* Project routes with individual error boundaries */}
          <Route
            path="/weather"
            element={
              <ErrorBoundary>
                <Weather mode={mode} toggleMode={toggleMode} />
              </ErrorBoundary>
            }
          />
          <Route
            path="/moodtracker"
            element={
              <ErrorBoundary>
                <MoodTracker mode={mode} toggleMode={toggleMode} />
              </ErrorBoundary>
            }
          />
          <Route
            path="/inputtracker"
            element={
              <ErrorBoundary>
                <InputTracker mode={mode} toggleMode={toggleMode} />
              </ErrorBoundary>
            }
          />
          <Route
            path="/rpg"
            element={
              <ErrorBoundary>
                <PygameRPG mode={mode} toggleMode={toggleMode} />
              </ErrorBoundary>
            }
          />
          <Route
            path="/options"
            element={
              <ErrorBoundary>
                <OptionsPlatform mode={mode} toggleMode={toggleMode} />
              </ErrorBoundary>
            }
          />
          <Route
            path="/war"
            element={
              <ErrorBoundary>
                <WarGameWrapper mode={mode} toggleMode={toggleMode} />
              </ErrorBoundary>
            }
          />
          <Route
            path="/crypto"
            element={
              <ErrorBoundary>
                <CryptoDashboard mode={mode} toggleMode={toggleMode} />
              </ErrorBoundary>
            }
          />
          <Route
            path="/ai-test"
            element={
              <ErrorBoundary>
                <AITestComponent />
              </ErrorBoundary>
            }
          />

          {/* 404 page */}
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </CustomBox>

      {/* Footer with its own error boundary */}
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </CustomBox>
  );
};

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const toggleMode = () => setMode(p => (p === 'light' ? 'dark' : 'light'));

  return (
    <>
      {/* Outer error boundary catches any errors in the entire app */}
      <AdvancedErrorBoundary
        name="Application Root"
        maxRetries={1}
        onError={(error, errorInfo, eventId) => {
          console.error('Critical application error:', {
            error,
            errorInfo,
            eventId,
          });
          // In production, this would be sent to error monitoring
        }}
      >
        <ToastProvider>
          <AppThemeProvider mode={mode} toggleMode={toggleMode}>
            <AppContent mode={mode} toggleMode={toggleMode} />
          </AppThemeProvider>
        </ToastProvider>
      </AdvancedErrorBoundary>
    </>
  );
}

export default App;
