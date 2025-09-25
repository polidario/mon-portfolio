import { getRouterParam, createError } from 'h3'
import { serverSupabaseClient } from '#supabase/server'

interface PageData {
  enabled: boolean
  title: string
  slug: string
  content: Array<Record<string, unknown>> | null
}

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }

  const client = await serverSupabaseClient(event)

  const { data, error } = await client
    .from('pages')
    .select('enabled, title, content, slug')
    .eq('slug', slug)
    .maybeSingle<PageData>()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  if (!data || data.enabled === false) {
    throw createError({ statusCode: 404, statusMessage: `Page with slug "${slug}" not found` })
  }

  return data
})
