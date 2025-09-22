import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useErrorTracker, withErrorTracking, trackApiCall, resetErrorTracker } from '../errorTracking'

// Mock fetch
global.fetch = vi.fn()

// Mock window and navigator
Object.defineProperty(window, 'location', {
  value: { href: 'https://example.com' },
  writable: true
})

Object.defineProperty(navigator, 'userAgent', {
  value: 'Mozilla/5.0 (Test Browser)',
  writable: true
})

describe('Error Tracking', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    resetErrorTracker()
  })

  it('should initialize error tracker', () => {
    const tracker = useErrorTracker({
      enableLogging: false,
      enableReporting: false
    })

    expect(tracker).toBeDefined()
    expect(typeof tracker.captureError).toBe('function')
    expect(typeof tracker.captureApiError).toBe('function')
  })

  it('should capture JavaScript errors', () => {
    const tracker = useErrorTracker({
      enableLogging: false,
      enableReporting: false
    })

    const error = new Error('Test error')
    tracker.captureError(error, {
      category: 'javascript',
      severity: 'high'
    })

    const errors = tracker.getErrors()
    expect(errors).toHaveLength(1)
    expect(errors[0].error.message).toBe('Test error')
    expect(errors[0].category).toBe('javascript')
    expect(errors[0].severity).toBe('high')
  })

  it('should capture API errors', () => {
    const tracker = useErrorTracker({
      enableLogging: false,
      enableReporting: false
    })

    tracker.captureApiError('/api/test', 500, 'Internal Server Error', { error: 'Database connection failed' })

    const errors = tracker.getErrors()
    expect(errors).toHaveLength(1)
    expect(errors[0].error.message).toBe('API Error: 500 Internal Server Error')
    expect(errors[0].category).toBe('api')
    expect(errors[0].severity).toBe('high')
    expect(errors[0].tags?.status).toBe('500')
  })

  it('should capture network errors', () => {
    const tracker = useErrorTracker({
      enableLogging: false,
      enableReporting: false
    })

    const networkError = new Error('Network timeout')
    tracker.captureNetworkError('/api/test', networkError)

    const errors = tracker.getErrors()
    expect(errors).toHaveLength(1)
    expect(errors[0].error.message).toBe('Network Error: Network timeout')
    expect(errors[0].category).toBe('network')
    expect(errors[0].severity).toBe('high')
  })

  it('should wrap functions with error tracking', () => {
    const tracker = useErrorTracker({
      enableLogging: false,
      enableReporting: false
    })

    const throwingFunction = () => {
      throw new Error('Function error')
    }

    const wrappedFunction = withErrorTracking(throwingFunction, {
      component: 'TestComponent',
      operation: 'testOperation'
    })

    expect(() => wrappedFunction()).toThrow('Function error')

    const errors = tracker.getErrors()
    expect(errors).toHaveLength(1)
    expect(errors[0].tags?.component).toBe('TestComponent')
    expect(errors[0].tags?.operation).toBe('testOperation')
  })

  it('should track API calls with error handling', async () => {
    const tracker = useErrorTracker({
      enableLogging: false,
      enableReporting: false
    })

    const failingApiCall = async () => {
      const response = new Response('Server Error', { status: 500, statusText: 'Internal Server Error' })
      throw response
    }

    await expect(
      trackApiCall(failingApiCall, { endpoint: '/api/test', method: 'GET' })
    ).rejects.toThrow()

    const errors = tracker.getErrors()
    expect(errors).toHaveLength(1)
    expect(errors[0].category).toBe('api')
  })

  it('should respect sample rate', () => {
    // Mock Math.random to always return 0.9 (90%)
    vi.spyOn(Math, 'random').mockReturnValue(0.9)

    const tracker = useErrorTracker({
      enableLogging: false,
      enableReporting: false,
      sampleRate: 0.5 // 50% sample rate
    })

    tracker.captureError(new Error('Test error'))

    // Should not capture due to sample rate
    const errors = tracker.getErrors()
    expect(errors).toHaveLength(0)
  })

  it('should respect max errors limit', () => {
    const tracker = useErrorTracker({
      enableLogging: false,
      enableReporting: false,
      maxErrors: 2
    })

    // Capture 3 errors, but only 2 should be stored
    tracker.captureError(new Error('Error 1'))
    tracker.captureError(new Error('Error 2'))
    tracker.captureError(new Error('Error 3'))

    const errors = tracker.getErrors()
    expect(errors).toHaveLength(2)
  })
})