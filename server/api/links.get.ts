/***
 * @name: links.ts
 * @description: This file is the API endpoint for fetching links and social media links from the Supabase database.
 * In order for this to work, you have to have a database table called 'links' with the following columns:
 * - id: integer/UUID, primary key, auto-increment
 * - label: string/text, not null
 * - path: string/text, not null
 * 
 * And a table called 'socials' with the following columns:
 * - id: integer/UUID, primary key, auto-increment
 * - label: string/text, not null
 * - icon: string/text, not null
 * - url: string/text, not null
 */

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  const { data, error } = await supabase.from('links').select('*')

  if (error) {
    return {
      links: [],
      social_links: [],
      error: error.message
    }
  }

  return {
    links: data,
    social_links: []
  }
})