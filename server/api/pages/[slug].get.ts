import { getRouterParam, createError, type H3Event, type EventHandlerRequest } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import type { PageData } from '#shared/types'

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>): Promise<PageData> => {
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
