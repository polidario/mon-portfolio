import { usePerformanceMonitor } from '~/utils/performance'
import { useErrorTracker } from '~/utils/errorTracking'

export default defineNuxtPlugin(() => {
  // Get runtime config for monitoring configuration
  const config = useRuntimeConfig()
  
  // Initialize performance monitoring
  const performanceMonitor = usePerformanceMonitor({
    enableLogging: process.env.NODE_ENV === 'development',
    enableReporting: process.env.NODE_ENV === 'production',
    reportingEndpoint: config.public.performanceEndpoint as string,
    sampleRate: 0.1 // 10% sampling in production
  })

  // Initialize error tracking
  const errorTracker = useErrorTracker({
    enableLogging: process.env.NODE_ENV === 'development',
    enableReporting: process.env.NODE_ENV === 'production',
    reportingEndpoint: config.public.errorEndpoint as string,
    environment: process.env.NODE_ENV as 'development' | 'production' | 'staging',
    buildVersion: config.public.buildVersion as string,
    sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0
  })

  // Set up performance monitoring callbacks
  performanceMonitor.onMetricsCollected((metrics) => {
    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Performance] Core Web Vitals collected:', metrics)
    }

    // Track performance issues
    if (metrics.lcp !== null && metrics.lcp > 4000) {
      errorTracker.capturePerformanceError('LCP', metrics.lcp, 4000)
    }
    if (metrics.fcp !== null && metrics.fcp > 3000) {
      errorTracker.capturePerformanceError('FCP', metrics.fcp, 3000)
    }
    if (metrics.cls !== null && metrics.cls > 0.25) {
      errorTracker.capturePerformanceError('CLS', metrics.cls, 0.25)
    }
    if (metrics.inp !== null && metrics.inp > 500) {
      errorTracker.capturePerformanceError('INP', metrics.inp, 500)
    }
  })

  // Provide global access to monitoring tools
  return {
    provide: {
      performanceMonitor,
      errorTracker
    }
  }
})