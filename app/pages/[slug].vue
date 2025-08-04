<script lang="ts" setup>
import { contentQuery } from "~/queries/content";
import type { GraphQLResponse } from "~/types/page"
import { getErrorMessage, getStatusCode } from "~~/shared/utils/errors"

interface StrapiError {
  statusCode?: number;
  message: string;
  data?: any;
}

const route = useRoute()
const slug = route.params.slug as string

// Use useAsyncData for proper SSR handling
const { data, error, pending } = await useAsyncData(`page-${slug}`, async () => {
  try {
    const graphql = useStrapiGraphQL()
    const result = await graphql<GraphQLResponse>(contentQuery, { "Slug": slug })
    
    // Check if we got any pages
    if (!result.data?.pages || result.data.pages.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: `Page with slug "${slug}" not found`
      })
    }
    
    return result.data.pages[0]
  } catch (err: unknown) {
    console.error('GraphQL Error:', err)
  
    const statusCode = getStatusCode(err)
    const message = getErrorMessage(err)
    
    // Handle different types of errors
    if (statusCode === 404) {
        throw err
    }
    
    throw createError({
        statusCode: statusCode || 500,
        statusMessage: `Failed to fetch page: ${message}`
    })
  }
})

// Handle error state
if (error.value) {
  throw error.value
}

// Set page meta
useHead({
  title: data.value?.title || 'Page'
})
</script>

<template>
  <div class="layout">
    <div v-if="pending" class="loading">
      Loading...
    </div>
    <div v-else-if="data?.content">
      <ContentGrid :content="data.content" />
    </div>
    <div v-else class="error">
      Page not found
    </div>
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 1.2rem;
}

.error {
  text-align: center;
  padding: 2rem;
  color: #ef4444;
}
</style>