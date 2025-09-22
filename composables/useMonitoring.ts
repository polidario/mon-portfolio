import type { PerformanceMetrics } from "~/utils/performance";

export interface MonitoringComposable {
  // Performance monitoring
  measurePageLoad: () => Promise<PerformanceMetrics | null>;
  getPerformanceMetrics: () => Partial<PerformanceMetrics>;

  // Error tracking
  captureError: (
    error: Error | string,
    context?: {
      component?: string;
      operation?: string;
      severity?: "low" | "medium" | "high" | "critical";
    }
  ) => void;
  captureApiError: (
    url: string,
    status: number,
    statusText: string,
    responseBody?: any
  ) => void;
  captureNetworkError: (url: string, error: Error) => void;

  // Utilities
  withErrorTracking: <T extends (...args: any[]) => any>(
    fn: T,
    context?: { component?: string; operation?: string }
  ) => Promise<T>;
  trackApiCall: <T>(
    apiCall: () => Promise<T>,
    context: { endpoint: string; method?: string }
  ) => Promise<T>;
}

export function useMonitoring(): MonitoringComposable {
  const { $performanceMonitor, $errorTracker } = useNuxtApp();

  return {
    // Performance monitoring methods
    measurePageLoad: async () => {
      const { measurePageLoad } = await import("~/utils/performance");
      return measurePageLoad();
    },

    getPerformanceMetrics: () => {
      return $performanceMonitor?.getMetrics() || {};
    },

    // Error tracking methods
    captureError: (error, context = {}) => {
      const errorInfo =
        typeof error === "string"
          ? { message: error }
          : { message: error.message, stack: error.stack };

      const tags: Record<string, string> = {};
      if (context.component) tags.component = context.component;
      if (context.operation) tags.operation = context.operation;

      $errorTracker?.captureError(errorInfo, {
        category: "javascript",
        severity: context.severity || "medium",
        tags,
      });
    },

    captureApiError: (url, status, statusText, responseBody) => {
      $errorTracker?.captureApiError(url, status, statusText, responseBody);
    },

    captureNetworkError: (url, error) => {
      $errorTracker?.captureNetworkError(url, error);
    },

    // Utility methods
    withErrorTracking: async (fn, context) => {
      const { withErrorTracking } = await import("~/utils/errorTracking");
      return withErrorTracking(fn, context);
    },

    trackApiCall: async (apiCall, context) => {
      const { trackApiCall } = await import("~/utils/errorTracking");
      return trackApiCall(apiCall, context);
    },
  };
}

// Specialized composables for common use cases
export function useApiMonitoring() {
  const monitoring = useMonitoring();

  return {
    // Wrapper for $fetch with automatic error tracking
    monitoredFetch: async <T>(url: string, options: any = {}): Promise<T> => {
      return monitoring.trackApiCall(() => $fetch<T>(url, options), {
        endpoint: url,
        method: options.method || "GET",
      });
    },

    // Track API response times
    trackApiTiming: async <T>(
      apiCall: () => Promise<T>,
      endpoint: string
    ): Promise<T> => {
      const startTime = performance.now();

      try {
        const result = await monitoring.trackApiCall(apiCall, { endpoint });
        const duration = performance.now() - startTime;

        // Log slow API calls
        if (duration > 2000) {
          monitoring.captureError(
            `Slow API call: ${endpoint} took ${duration}ms`,
            {
              operation: "api_timing",
              severity: "medium",
            }
          );
        }

        return result;
      } catch (error) {
        const duration = performance.now() - startTime;
        monitoring.captureError(
          `API call failed: ${endpoint} after ${duration}ms`,
          {
            operation: "api_timing",
            severity: "high",
          }
        );
        throw error;
      }
    },
  };
}

export function useComponentMonitoring(componentName: string) {
  const monitoring = useMonitoring();

  return {
    // Track component errors
    captureComponentError: (
      error: Error,
      errorInfo?: { componentStack?: string }
    ) => {
      const { $errorTracker } = useNuxtApp();
      $errorTracker?.captureComponentError(componentName, error, errorInfo);
    },

    // Wrap component methods with error tracking
    withComponentErrorTracking: <T extends (...args: any[]) => any>(
      fn: T
    ): T => {
      // Create a wrapper that handles the async import internally
      return ((...args: any[]) => {
        try {
          const result = fn(...args);

          // Handle async functions
          if (result instanceof Promise) {
            return result.catch((error) => {
              monitoring.captureError(error, {
                component: componentName,
                severity: "high",
              });
              throw error;
            });
          }

          return result;
        } catch (error) {
          monitoring.captureError(error as Error, {
            component: componentName,
            severity: "high",
          });
          throw error;
        }
      }) as T;
    },

    // Track component performance
    measureComponentRender: () => {
      const startTime = performance.now();

      return {
        end: () => {
          const duration = performance.now() - startTime;

          // Log slow component renders
          if (duration > 100) {
            monitoring.captureError(
              `Slow component render: ${componentName} took ${duration}ms`,
              {
                component: componentName,
                operation: "render",
                severity: "low",
              }
            );
          }

          return duration;
        },
      };
    },
  };
}
