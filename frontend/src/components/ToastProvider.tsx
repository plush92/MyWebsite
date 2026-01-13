import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert, AlertColor, Slide, SlideProps } from '@mui/material';

interface Toast {
  id: string;
  message: string;
  severity: AlertColor;
  duration?: number;
}

interface ToastContextType {
  showToast: (
    message: string,
    severity?: AlertColor,
    duration?: number
  ) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
}

// Slide transition for toast
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Custom hook to use toast notifications
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

/**
 * Toast Notification Provider
 *
 * Provides a context for showing user-friendly notifications
 * instead of browser alert() calls
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (
      message: string,
      severity: AlertColor = 'info',
      duration: number = 4000
    ) => {
      const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const newToast: Toast = { id, message, severity, duration };

      setToasts(prevToasts => [...prevToasts, newToast]);

      // Auto-remove toast after duration
      setTimeout(() => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
      }, duration);
    },
    []
  );

  const showSuccess = useCallback(
    (message: string, duration?: number) => {
      showToast(message, 'success', duration);
    },
    [showToast]
  );

  const showError = useCallback(
    (message: string, duration?: number) => {
      showToast(message, 'error', duration || 6000); // Errors show longer
    },
    [showToast]
  );

  const showWarning = useCallback(
    (message: string, duration?: number) => {
      showToast(message, 'warning', duration);
    },
    [showToast]
  );

  const showInfo = useCallback(
    (message: string, duration?: number) => {
      showToast(message, 'info', duration);
    },
    [showToast]
  );

  const handleClose = (toastId: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== toastId));
  };

  const contextValue: ToastContextType = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {/* Render all active toasts */}
      {toasts.map((toast, index) => (
        <Snackbar
          key={toast.id}
          open={true}
          autoHideDuration={toast.duration}
          onClose={() => handleClose(toast.id)}
          TransitionComponent={SlideTransition}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{
            // Stack multiple toasts
            bottom: `${index * 70 + 16}px !important`,
          }}
        >
          <Alert
            onClose={() => handleClose(toast.id)}
            severity={toast.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </ToastContext.Provider>
  );
};

/**
 * Utility functions for showing toasts without hooks
 * (useful in error boundaries and other places where hooks can't be used)
 */
let toastInstance: ToastContextType | null = null;

export const setToastInstance = (instance: ToastContextType) => {
  toastInstance = instance;
};

export const toast = {
  success: (message: string, duration?: number) => {
    toastInstance?.showSuccess(message, duration);
  },
  error: (message: string, duration?: number) => {
    toastInstance?.showError(message, duration);
  },
  warning: (message: string, duration?: number) => {
    toastInstance?.showWarning(message, duration);
  },
  info: (message: string, duration?: number) => {
    toastInstance?.showInfo(message, duration);
  },
};

export default ToastProvider;
