import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
// Environment-based feature flags
export const FEATURES = {
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_ERROR_BOUNDARY: import.meta.env.VITE_ENABLE_ERROR_BOUNDARY !== 'false',
};

// Global error handler to log uncaught errors
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
  Sentry.captureException(event.error);
});

// Global promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  Sentry.captureException(event.reason);
});

// Utility to set user context for Sentry
export const setSentryUser = (user: { id: string; email?: string; username?: string }) => {
  Sentry.setUser(user);
};

// Utility to clear user context on logout
export const clearSentryUser = () => {
  Sentry.configureScope((scope) => scope.setUser(null));
};

// Optional: Performance monitoring helper
export const startTransaction = (name: string, op: string) => {
  return Sentry.startTransaction({ name, op });
};
