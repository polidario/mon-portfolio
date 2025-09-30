<script lang="ts" setup>
// This page fetches content from a server route backed by Supabase.
// It calls /api/pages/[slug] which returns: { enabled, title, content, slug }

const route = useRoute()
const slug = route.params.slug as string

const { data, error, pending } = await useFetch(`/api/pages/${slug}`, {
  key: `page-${slug}`
})

if (error.value) {
  throw error.value
}

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
