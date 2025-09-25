<script lang="ts" setup>
// This page now sources content from Supabase instead of Strapi.
// Expected table: "pages" with columns:
// - slug (text, unique)
// - title (text)
// - content (json/jsonb) shaped for <ContentGrid />
// - enabled (boolean)

interface SupabasePage {
  enabled?: boolean
  slug: string
  title: string
  content: Array<Record<string, any>> | null
}

const route = useRoute()
const slug = route.params.slug as string
const supabase = useSupabaseClient()

const { data, error, pending } = await useAsyncData(`page-${slug}`, async () => {
  const { data, error } = await supabase
    .from('pages')
    .select('enabled, title, content, slug')
    .eq('slug', slug)
    .maybeSingle<SupabasePage>()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
  if (!data || data.enabled === false) {
    throw createError({ statusCode: 404, statusMessage: `Page with slug "${slug}" not found` })
  }

  return data
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
