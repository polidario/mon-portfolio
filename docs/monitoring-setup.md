# Performance Monitoring and Error Tracking Setup

This document describes the performance monitoring and error tracking foundation that has been implemented in the application.

## Overview

The monitoring system provides:
- **Performance Monitoring**: Automatic collection of Core Web Vitals (FCP, LCP, CLS, FID, TTFB)
- **Error Tracking**: Comprehensive error capture and reporting for JavaScript, API, network, and component errors
- **Automatic Setup**: Plugin-based initialization with minimal configuration
- **Development Tools**: Composables and utilities for easy integration

## Components

### 1. Performance Monitoring (`utils/performance.ts`)

Automatically collects Core Web Vitals using the `web-vitals` library:

```typescript
import { usePerformanceMonitor, measurePageLoad, getPerformanceScore } from '~/utils/performance'

// Initialize monitoring
const monitor = usePerformanceMonitor({
  enableLogging: true,
  enableReporting: false,
  sampleRate: 1.0
})

// Get current metrics
const metrics = monitor.getMetrics()

// Wait for all metrics to be collected
const completeMetrics = await measurePageLoad()

// Calculate performance score (0-100)
const score = getPerformanceScore(completeMetrics)
```

### 2. Error Tracking (`utils/errorTracking.ts`)

Captures and reports various types of errors:

```typescript
import { useErrorTracker, withErrorTracking, trackApiCall } from '~/utils/errorTracking'

// Initialize error tracking
const tracker = useErrorTracker({
  enableLogging: true,
  enableReporting: false,
  environment: 'development'
})

// Capture errors manually
tracker.captureError(new Error('Something went wrong'), {
  category: 'javascript',
  severity: 'high',
  tags: { component: 'MyComponent' }
})

// Wrap functions with automatic error tracking
const safeFunction = withErrorTracking(riskyFunction, {
  component: 'MyComponent',
  operation: 'dataProcessing'
})

// Track API calls with automatic error handling
const result = await trackApiCall(
  () => fetch('/api/data'),
  { endpoint: '/api/data', method: 'GET' }
)
```

### 3. Monitoring Plugin (`plugins/monitoring.client.ts`)

Automatically initializes monitoring when the app starts:
- Sets up performance monitoring with environment-appropriate configuration
- Initializes error tracking with global error handlers
- Connects performance issues to error tracking
- Provides global access via `$performanceMonitor` and `$errorTracker`

### 4. Monitoring Composables (`composables/useMonitoring.ts`)

Provides easy-to-use composables for components:

```vue
<script setup>
import { useMonitoring, useApiMonitoring, useComponentMonitoring } from '~/composables/useMonitoring'

const monitoring = useMonitoring()
const apiMonitoring = useApiMonitoring()
const componentMonitoring = useComponentMonitoring('MyComponent')

// Measure performance
const metrics = await monitoring.measurePageLoad()

// Make monitored API calls
const data = await apiMonitoring.monitoredFetch('/api/data')

// Track component errors
const safeMethod = componentMonitoring.withComponentErrorTracking(myMethod)

// Measure component render time
const timer = componentMonitoring.measureComponentRender()
// ... do work ...
const renderTime = timer.end()
</script>
```

## Configuration

### Environment Variables

Add these to your `.env` file for production monitoring:

```env
# Performance monitoring endpoint
PERFORMANCE_ENDPOINT=https://your-analytics-service.com/performance

# Error reporting endpoint  
ERROR_ENDPOINT=https://your-error-service.com/errors

# Build version for error context
BUILD_VERSION=1.0.0
```

### Runtime Configuration

The monitoring system uses Nuxt's runtime config:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      performanceEndpoint: process.env.PERFORMANCE_ENDPOINT || '',
      errorEndpoint: process.env.ERROR_ENDPOINT || '',
      buildVersion: process.env.BUILD_VERSION || '1.0.0'
    }
  }
})
```

## Usage Examples

### Basic Error Handling in Components

```vue
<script setup>
const componentMonitoring = useComponentMonitoring('UserProfile')

const loadUserData = componentMonitoring.withComponentErrorTracking(async (userId) => {
  const timer = componentMonitoring.measureComponentRender()
  
  try {
    const user = await apiMonitoring.monitoredFetch(`/api/users/${userId}`)
    return user
  } finally {
    timer.end()
  }
})
</script>
```

### API Error Handling

```typescript
// Automatic error tracking for API calls
const apiMonitoring = useApiMonitoring()

try {
  const response = await apiMonitoring.monitoredFetch('/api/data', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
} catch (error) {
  // Error is automatically tracked with context
  console.error('API call failed:', error)
}
```

### Performance Monitoring

```typescript
const monitoring = useMonitoring()

// Get current performance metrics
const currentMetrics = monitoring.getPerformanceMetrics()

// Wait for complete metrics collection
const completeMetrics = await monitoring.measurePageLoad()

// Check if performance is good
const score = getPerformanceScore(completeMetrics)
if (score < 75) {
  console.warn('Performance below threshold:', score)
}
```

## Automatic Features

### Global Error Handlers

The system automatically captures:
- Unhandled JavaScript errors
- Unhandled promise rejections  
- Resource loading errors (images, scripts, etc.)
- Network timeouts and failures

### Performance Thresholds

Automatically reports performance issues when:
- LCP > 4000ms
- FCP > 3000ms  
- CLS > 0.25
- FID > 300ms

### Error Classification

Errors are automatically categorized as:
- `javascript`: Runtime JavaScript errors
- `network`: Network connectivity issues
- `api`: API response errors
- `component`: Vue component errors
- `performance`: Performance threshold violations

## Testing

Run the test suite to verify monitoring functionality:

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with UI
yarn test:ui
```

## Integration with External Services

### Performance Analytics

To send performance data to external services, configure the `performanceEndpoint`:

```typescript
// The system will POST performance data in this format:
{
  fcp: 1200,
  lcp: 2000,
  cls: 0.05,
  fid: 80,
  ttfb: 500,
  timestamp: 1640995200000,
  url: "https://yoursite.com/page",
  userAgent: "Mozilla/5.0..."
}
```

### Error Reporting

To send errors to external services, configure the `errorEndpoint`:

```typescript
// The system will POST error data in this format:
{
  error: {
    message: "Error message",
    stack: "Error stack trace"
  },
  context: {
    url: "https://yoursite.com/page",
    userAgent: "Mozilla/5.0...",
    timestamp: 1640995200000,
    sessionId: "session-123",
    buildVersion: "1.0.0",
    environment: "production"
  },
  severity: "high",
  category: "javascript",
  tags: {
    component: "UserProfile",
    operation: "loadData"
  }
}
```

## Best Practices

1. **Use Component Monitoring**: Wrap component methods with error tracking
2. **Monitor API Calls**: Use `monitoredFetch` for automatic error handling
3. **Measure Performance**: Use render timers for performance-critical components
4. **Set Appropriate Sample Rates**: Use lower sample rates in production to reduce overhead
5. **Tag Errors**: Add meaningful tags to help with debugging and categorization
6. **Handle Errors Gracefully**: Don't let monitoring interfere with user experience

## Requirements Satisfied

This implementation satisfies the following requirements:

- **Requirement 6.1**: Achieves Lighthouse performance score monitoring
- **Requirement 6.4**: Implements efficient caching strategies for monitoring data
- **Requirement 2.1**: Provides user-friendly error messages and handling

The foundation is now ready for the next phase of implementation: loading states and skeleton components.