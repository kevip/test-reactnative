/**
 * Logger Service
 * 
 * This service handles logging throughout the app.
 * Currently uses console.log for React Native debugging.
 * In production, this would send logs to a service like Sentry, LogRocket, or Datadog.
 */

class LoggerService {
  error(message: string, error?: any) {
    console.error(`[ERROR] ${message}`, error);
    // TODO: Send to logging service provider (e.g., Sentry.captureException(error))
  }

  info(message: string, data?: any) {
    console.log(`[INFO] ${message}`, data);
    // TODO: Send to logging service provider
  }

  warn(message: string, data?: any) {
    console.warn(`[WARN] ${message}`, data);
    // TODO: Send to logging service provider
  }

  httpError(endpoint: string, error: any) {
    const errorMessage = `HTTP Error at ${endpoint}`;
    console.error(errorMessage, {
      endpoint,
      status: error?.response?.status,
      message: error?.message,
      data: error?.response?.data,
    });
    // TODO: Send to logging service provider
  }
}

export const logger = new LoggerService();
