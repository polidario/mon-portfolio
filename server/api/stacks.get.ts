/***
 * @name: stacks.get.ts
 * @description: This file is the API endpoint for fetching all of the stacks that you use as a software engineer
 * In order for this to work, you have to have a database table called 'website' with the following columns:
 * - id: integer/UUID, primary key, auto-increment
 * - name: The name of the website/brand
 * - description: The description about your website/brand.
 * - url: The URL of the website
 * - icon: You can use any kind of icon string here but usually, I use icons from MDI (e.g.: mdi-language-php)
 * - colored_icon: You basically provide an SVG tag here but make sure that the size of the SVG is set to 64x64 (e.g.: <svg width="64" height="64" ... /> </svg>)
 */

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event): Promise<StackResponse[]> => {
  try {
    const supabase = await serverSupabaseClient(event)
  
    const { data, error } = await supabase.from('stacks').select('*')
  
    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch website data',
        data: error.message
      })
    }
  
    return data as StackResponse[]

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