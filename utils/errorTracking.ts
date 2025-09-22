export interface ErrorInfo {
  message: string
  stack?: string
  componentStack?: string
  errorBoundary?: string
}

export interface ErrorContext {
  url: string
  userAgent: string
  timestamp: number
  userId?: string
  sessionId?: string
  buildVersion?: string
  environment: 'development' | 'production' | 'staging'
}

export interface ErrorReport {
  error: ErrorInfo
  context: ErrorContext
  severity: 'low' | 'medium' | 'high' | 'critical'
  category: 'javascript' | 'network' | 'api' | 'component' | 'performance'
  tags?: Record<string, string | undefined>
}

export interface ErrorTrackingConfig {
  enableLogging: boolean
  enableReporting: boolean
  reportingEndpoint?: string
  maxErrors: number
  sampleRate: number
  environment: 'development' | 'production' | 'staging'
  buildVersion?: string
}

class ErrorTracker {
  private config: ErrorTrackingConfig
  private errorQueue: ErrorReport[] = []
  private sessionId: string
  private errorCount = 0

  constructor(config: Partial<ErrorTrackingConfig> = {}) {
    this.config = {
      enableLogging: true,
      enableReporting: false,
      maxErrors: 50,
      sampleRate: 1.0,
      environment: 'development',
      ...config
    }

    this.sessionId = this.generateSessionId()
    this.setupGlobalErrorHandlers()
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private setupGlobalErrorHandlers() {
    if (typeof window === 'undefined') return

    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      this.captureError({
        message: event.message,
        stack: event.error?.stack,
      }, {
        category: 'javascript',
        severity: 'high',
        tags: {
          filename: event.filename,
          lineno: event.lineno?.toString(),
          colno: event.colno?.toString()
        }
      })
    })

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
      }, {
        category: 'javascript',
        severity: 'high',
        tags: {
          type: 'unhandled_promise_rejection'
        }
      })
    })

    // Handle resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        const target = event.target as HTMLElement
        this.captureError({
          message: `Resource failed to load: ${target.tagName}`,
        }, {
          category: 'network',
          severity: 'medium',
          tags: {
            resourceType: target.tagName.toLowerCase(),
            src: (target as any).src || (target as any).href
          }
        })
      }
    }, true)
  }

  public captureError(
    error: ErrorInfo | Error,
    options: {
      category?: ErrorReport['category']
      severity?: ErrorReport['severity']
      tags?: Record<string, string>
      userId?: string
    } = {}
  ) {
    // Rate limiting
    this.errorCount++
    if (this.errorCount > this.config.maxErrors) {
      return
    }

    // Sample rate check
    if (Math.random() > this.config.sampleRate) {
      return
    }

    const errorInfo: ErrorInfo = error instanceof Error 
      ? {
          message: error.message,
          stack: error.stack
        }
      : error

    const errorReport: ErrorReport = {
      error: errorInfo,
      context: {
        url: typeof window !== 'undefined' ? window.location.href : '',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        timestamp: Date.now(),
        sessionId: this.sessionId,
        userId: options.userId,
        buildVersion: this.config.buildVersion,
        environment: this.config.environment
      },
      severity: options.severity || 'medium',
      category: options.category || 'javascript',
      tags: options.tags
    }

    // Add to queue
    this.errorQueue.push(errorReport)

    // Log if enabled
    if (this.config.enableLogging) {
      console.error('[ErrorTracker]', errorReport)
    }

    // Report if enabled
    if (this.config.enableReporting) {
      this.reportError(errorReport)
    }
  }

  private async reportError(errorReport: ErrorReport) {
    if (!this.config.reportingEndpoint) return

    try {
      await fetch(this.config.reportingEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(errorReport)
      })
    } catch (error) {
      console.error('[ErrorTracker] Failed to report error:', error)
    }
  }

  public captureApiError(
    url: string,
    status: number,
    statusText: string,
    responseBody?: any
  ) {
    this.captureError({
      message: `API Error: ${status} ${statusText}`,
      stack: `URL: ${url}\nResponse: ${JSON.stringify(responseBody, null, 2)}`
    }, {
      category: 'api',
      severity: status >= 500 ? 'high' : 'medium',
      tags: {
        url,
        status: status.toString(),
        statusText
      }
    })
  }

  public captureNetworkError(url: string, error: Error) {
    this.captureError({
      message: `Network Error: ${error.message}`,
      stack: error.stack
    }, {
      category: 'network',
      severity: 'high',
      tags: {
        url,
        type: 'network_error'
      }
    })
  }

  public captureComponentError(
    componentName: string,
    error: Error,
    errorInfo?: { componentStack?: string }
  ) {
    this.captureError({
      message: `Component Error in ${componentName}: ${error.message}`,
      stack: error.stack,
      componentStack: errorInfo?.componentStack
    }, {
      category: 'component',
      severity: 'high',
      tags: {
        component: componentName
      }
    })
  }

  public capturePerformanceError(metric: string, value: number, threshold: number) {
    this.captureError({
      message: `Performance threshold exceeded: ${metric} = ${value}ms (threshold: ${threshold}ms)`
    }, {
      category: 'performance',
      severity: 'medium',
      tags: {
        metric,
        value: value.toString(),
        threshold: threshold.toString()
      }
    })
  }

  public getErrors(): ErrorReport[] {
    return [...this.errorQueue]
  }

  public clearErrors() {
    this.errorQueue = []
    this.errorCount = 0
  }

  public updateConfig(newConfig: Partial<ErrorTrackingConfig>) {
    this.config = { ...this.config, ...newConfig }
  }

  public setUserId(userId: string) {
    // Update all future error reports with user ID
    this.config = { ...this.config }
    // Note: This would typically be stored in a way that persists across error reports
  }
}

// Singleton instance
let errorTracker: ErrorTracker | null = null

export function useErrorTracker(config?: Partial<ErrorTrackingConfig>): ErrorTracker {
  if (!errorTracker) {
    errorTracker = new ErrorTracker(config)
  }
  return errorTracker
}

// For testing purposes - reset the singleton
export function resetErrorTracker() {
  errorTracker = null
}

// Utility functions for common error scenarios
export function withErrorTracking<T extends (...args: any[]) => any>(
  fn: T,
  context?: { component?: string; operation?: string }
): T {
  return ((...args: any[]) => {
    try {
      const result = fn(...args)
      
      // Handle async functions
      if (result instanceof Promise) {
        return result.catch((error) => {
          const tracker = useErrorTracker()
          tracker.captureError(error, {
            category: 'javascript',
            severity: 'high',
            tags: {
              ...(context?.component && { component: context.component }),
              ...(context?.operation && { operation: context.operation }),
              type: 'async_error'
            }
          })
          throw error
        })
      }
      
      return result
    } catch (error) {
      const tracker = useErrorTracker()
      tracker.captureError(error as Error, {
        category: 'javascript',
        severity: 'high',
        tags: {
          ...(context?.component && { component: context.component }),
          ...(context?.operation && { operation: context.operation }),
          type: 'sync_error'
        }
      })
      throw error
    }
  }) as T
}

// API error tracking wrapper
export async function trackApiCall<T>(
  apiCall: () => Promise<T>,
  context: { endpoint: string; method?: string }
): Promise<T> {
  const tracker = useErrorTracker()
  
  try {
    return await apiCall()
  } catch (error) {
    if (error instanceof Response) {
      tracker.captureApiError(
        context.endpoint,
        error.status,
        error.statusText,
        await error.text().catch(() => 'Unable to read response')
      )
    } else if (error instanceof Error) {
      tracker.captureNetworkError(context.endpoint, error)
    } else {
      tracker.captureError({
        message: `Unknown API error: ${String(error)}`
      }, {
        category: 'api',
        severity: 'high',
        tags: {
          endpoint: context.endpoint,
          method: context.method || 'unknown'
        }
      })
    }
    throw error
  }
}