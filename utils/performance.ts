import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals'

export interface PerformanceMetrics {
  fcp: number | null // First Contentful Paint
  lcp: number | null // Largest Contentful Paint
  inp: number | null // Interaction to Next Paint (replaces FID)
  cls: number | null // Cumulative Layout Shift
  ttfb: number | null // Time to First Byte
  timestamp: number
  url: string
  userAgent: string
}

export interface PerformanceConfig {
  enableLogging: boolean
  enableReporting: boolean
  reportingEndpoint?: string
  sampleRate: number
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {}
  private config: PerformanceConfig
  private callbacks: Array<(metrics: PerformanceMetrics) => void> = []

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = {
      enableLogging: true,
      enableReporting: false,
      sampleRate: 1.0,
      ...config
    }

    this.initializeMetrics()
  }

  private initializeMetrics() {
    // Initialize base metrics
    this.metrics = {
      fcp: null,
      lcp: null,
      inp: null,
      cls: null,
      ttfb: null,
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
    }

    // Only collect metrics on client side
    if (typeof window === 'undefined') return

    // Collect Core Web Vitals
    onCLS(this.handleMetric.bind(this))
    onFCP(this.handleMetric.bind(this))
    onINP(this.handleMetric.bind(this)) // INP replaces FID in web-vitals v4
    onLCP(this.handleMetric.bind(this))
    onTTFB(this.handleMetric.bind(this))
  }

  private handleMetric(metric: Metric) {
    // Update metrics object
    switch (metric.name) {
      case 'CLS':
        this.metrics.cls = metric.value
        break
      case 'FCP':
        this.metrics.fcp = metric.value
        break
      case 'INP':
        this.metrics.inp = metric.value
        break
      case 'LCP':
        this.metrics.lcp = metric.value
        break
      case 'TTFB':
        this.metrics.ttfb = metric.value
        break
    }

    // Log metric if enabled
    if (this.config.enableLogging) {
      console.log(`[Performance] ${metric.name}:`, metric.value)
    }

    // Report metric if all core metrics are collected
    if (this.areAllMetricsCollected()) {
      this.reportMetrics()
    }
  }

  private areAllMetricsCollected(): boolean {
    return !!(
      this.metrics.fcp !== null &&
      this.metrics.lcp !== null &&
      this.metrics.cls !== null &&
      this.metrics.ttfb !== null
    )
  }

  private reportMetrics() {
    const completeMetrics = this.metrics as PerformanceMetrics

    // Execute callbacks
    this.callbacks.forEach(callback => {
      try {
        callback(completeMetrics)
      } catch (error) {
        console.error('[Performance] Callback error:', error)
      }
    })

    // Report to external endpoint if configured
    if (this.config.enableReporting && this.config.reportingEndpoint) {
      this.sendMetricsToEndpoint(completeMetrics)
    }
  }

  private async sendMetricsToEndpoint(metrics: PerformanceMetrics) {
    try {
      // Sample rate check
      if (Math.random() > this.config.sampleRate) return

      await fetch(this.config.reportingEndpoint!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(metrics)
      })
    } catch (error) {
      console.error('[Performance] Failed to report metrics:', error)
    }
  }

  public onMetricsCollected(callback: (metrics: PerformanceMetrics) => void) {
    this.callbacks.push(callback)
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics }
  }

  public updateConfig(newConfig: Partial<PerformanceConfig>) {
    this.config = { ...this.config, ...newConfig }
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null

export function usePerformanceMonitor(config?: Partial<PerformanceConfig>): PerformanceMonitor {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor(config)
  }
  return performanceMonitor
}

// Utility functions for specific metrics
export function measurePageLoad(): Promise<PerformanceMetrics | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(null)
      return
    }

    const monitor = usePerformanceMonitor()
    
    // If metrics are already collected, return them
    const currentMetrics = monitor.getMetrics()
    if (currentMetrics.fcp && currentMetrics.lcp && currentMetrics.cls !== null && currentMetrics.ttfb) {
      resolve(currentMetrics as PerformanceMetrics)
      return
    }

    // Otherwise wait for metrics to be collected
    monitor.onMetricsCollected((metrics) => {
      resolve(metrics)
    })

    // Timeout after 10 seconds
    setTimeout(() => {
      resolve(monitor.getMetrics() as PerformanceMetrics)
    }, 10000)
  })
}

export function getPerformanceScore(metrics: PerformanceMetrics): number {
  // Calculate a simple performance score based on Core Web Vitals thresholds
  let score = 0
  let totalMetrics = 0

  // FCP scoring (good: <1.8s, needs improvement: 1.8-3s, poor: >3s)
  if (metrics.fcp !== null) {
    totalMetrics++
    if (metrics.fcp <= 1800) score += 100
    else if (metrics.fcp <= 3000) score += 50
    else score += 0
  }

  // LCP scoring (good: <2.5s, needs improvement: 2.5-4s, poor: >4s)
  if (metrics.lcp !== null) {
    totalMetrics++
    if (metrics.lcp <= 2500) score += 100
    else if (metrics.lcp <= 4000) score += 50
    else score += 0
  }

  // CLS scoring (good: <0.1, needs improvement: 0.1-0.25, poor: >0.25)
  if (metrics.cls !== null) {
    totalMetrics++
    if (metrics.cls <= 0.1) score += 100
    else if (metrics.cls <= 0.25) score += 50
    else score += 0
  }

  // INP scoring (good: <200ms, needs improvement: 200-500ms, poor: >500ms)
  if (metrics.inp !== null) {
    totalMetrics++
    if (metrics.inp <= 200) score += 100
    else if (metrics.inp <= 500) score += 50
    else score += 0
  }

  return totalMetrics > 0 ? Math.round(score / totalMetrics) : 0
}