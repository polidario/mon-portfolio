import { getRouterParam, createError } from 'h3'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event): Promise<PageData> => {
  try {
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
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
        throw error
    }
    
    throw createError({
        statusCode: 500,
        statusMessage: 'Internal server error',
        data: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})
