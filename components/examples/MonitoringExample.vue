<template>
  <div class="monitoring-example">
    <h3>Performance & Error Monitoring Example</h3>
    
    <div class="actions">
      <button @click="measurePerformance" class="btn">
        Measure Performance
      </button>
      
      <button @click="triggerError" class="btn btn-danger">
        Trigger Error
      </button>
      
      <button @click="simulateApiCall" class="btn">
        Simulate API Call
      </button>
      
      <button @click="simulateSlowOperation" class="btn">
        Slow Operation
      </button>
    </div>

    <div v-if="performanceData" class="performance-data">
      <h4>Performance Metrics</h4>
      <pre>{{ JSON.stringify(performanceData, null, 2) }}</pre>
    </div>

    <div v-if="errors.length > 0" class="errors">
      <h4>Captured Errors</h4>
      <div v-for="(error, index) in errors" :key="index" class="error-item">
        <strong>{{ error.category }}:</strong> {{ error.error.message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMonitoring, useApiMonitoring, useComponentMonitoring } from '~/composables/useMonitoring'
import type { PerformanceMetrics } from '~/utils/performance'
import type { ErrorReport } from '~/utils/errorTracking'

const monitoring = useMonitoring()
const apiMonitoring = useApiMonitoring()
const componentMonitoring = useComponentMonitoring('MonitoringExample')

const performanceData = ref<PerformanceMetrics | null>(null)
const errors = ref<ErrorReport[]>([])

// Measure current performance metrics
const measurePerformance = componentMonitoring.withComponentErrorTracking(async () => {
  const timer = componentMonitoring.measureComponentRender()
  
  try {
    const metrics = await monitoring.measurePageLoad()
    performanceData.value = metrics
    
    // Simulate some work
    await new Promise(resolve => setTimeout(resolve, 50))
    
    const renderTime = timer.end()
    console.log(`Component render took: ${renderTime}ms`)
  } catch (error) {
    monitoring.captureError(error as Error, {
      component: 'MonitoringExample',
      operation: 'measurePerformance',
      severity: 'medium'
    })
  }
})

// Trigger an intentional error for testing
const triggerError = componentMonitoring.withComponentErrorTracking(() => {
  throw new Error('This is a test error from MonitoringExample component')
})

// Simulate an API call with monitoring
const simulateApiCall = componentMonitoring.withComponentErrorTracking(async () => {
  try {
    // This will fail and be tracked
    await apiMonitoring.monitoredFetch('/api/nonexistent-endpoint')
  } catch (error) {
    console.log('API call failed as expected:', error)
  }
})

// Simulate a slow operation that might trigger performance warnings
const simulateSlowOperation = componentMonitoring.withComponentErrorTracking(async () => {
  const timer = componentMonitoring.measureComponentRender()
  
  // Simulate slow work (this should trigger a performance warning)
  await new Promise(resolve => setTimeout(resolve, 150))
  
  timer.end()
})

// Get current errors for display (in a real app, you wouldn't expose this)
const refreshErrors = () => {
  const { $errorTracker } = useNuxtApp()
  if ($errorTracker) {
    errors.value = $errorTracker.getErrors().slice(-5) // Show last 5 errors
  }
}

// Refresh errors periodically for demo purposes
onMounted(() => {
  const interval = setInterval(refreshErrors, 1000)
  onUnmounted(() => clearInterval(interval))
})
</script>

<style scoped>
.monitoring-example {
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 1rem 0;
}

.actions {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.btn {
  padding: 0.5rem 1rem;
  border: 1px solid #007bff;
  background: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn:hover {
  background: #0056b3;
}

.btn-danger {
  background: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background: #c82333;
}

.performance-data,
.errors {
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.performance-data pre {
  margin: 0;
  font-size: 0.875rem;
  overflow-x: auto;
}

.error-item {
  padding: 0.5rem;
  margin: 0.5rem 0;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 4px;
  font-size: 0.875rem;
}
</style>