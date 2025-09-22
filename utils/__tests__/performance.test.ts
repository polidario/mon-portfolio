import { describe, it, expect, vi, beforeEach } from 'vitest'
import { usePerformanceMonitor, getPerformanceScore } from '../performance'

// Mock web-vitals
vi.mock('web-vitals', () => ({
  onCLS: vi.fn((callback) => callback({ name: 'CLS', value: 0.05 })),
  onFCP: vi.fn((callback) => callback({ name: 'FCP', value: 1200 })),
  onINP: vi.fn((callback) => callback({ name: 'INP', value: 80 })),
  onLCP: vi.fn((callback) => callback({ name: 'LCP', value: 2000 })),
  onTTFB: vi.fn((callback) => callback({ name: 'TTFB', value: 500 }))
}))

// Mock window and navigator
Object.defineProperty(window, 'location', {
  value: { href: 'https://example.com' },
  writable: true
})

Object.defineProperty(navigator, 'userAgent', {
  value: 'Mozilla/5.0 (Test Browser)',
  writable: true
})

describe('Performance Monitoring', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize performance monitor', () => {
    const monitor = usePerformanceMonitor({
      enableLogging: false,
      enableReporting: false
    })

    expect(monitor).toBeDefined()
    expect(typeof monitor.getMetrics).toBe('function')
    expect(typeof monitor.onMetricsCollected).toBe('function')
  })

  it('should collect performance metrics', async () => {
    const monitor = usePerformanceMonitor({
      enableLogging: false,
      enableReporting: false
    })

    // Wait a bit for metrics to be collected
    await new Promise(resolve => setTimeout(resolve, 100))

    const metrics = monitor.getMetrics()
    expect(metrics.fcp).toBe(1200)
    expect(metrics.lcp).toBe(2000)
    expect(metrics.cls).toBe(0.05)
    expect(metrics.ttfb).toBe(500)
  })

  it('should calculate performance score correctly', () => {
    const goodMetrics = {
      fcp: 1200,
      lcp: 2000,
      cls: 0.05,
      inp: 80,
      ttfb: 500,
      timestamp: Date.now(),
      url: 'https://example.com',
      userAgent: 'test'
    }

    const score = getPerformanceScore(goodMetrics)
    expect(score).toBe(100) // All metrics are in "good" range

    const poorMetrics = {
      fcp: 4000,
      lcp: 5000,
      cls: 0.3,
      inp: 600,
      ttfb: 500,
      timestamp: Date.now(),
      url: 'https://example.com',
      userAgent: 'test'
    }

    const poorScore = getPerformanceScore(poorMetrics)
    expect(poorScore).toBe(0) // All metrics are in "poor" range
  })

  it('should handle metrics callback', () => {
    const monitor = usePerformanceMonitor({
      enableLogging: false,
      enableReporting: false
    })

    // Test that the callback can be registered
    expect(() => {
      monitor.onMetricsCollected((metrics) => {
        // This callback would be called when metrics are collected
        console.log('Metrics collected:', metrics)
      })
    }).not.toThrow()
  })
})