/***
 * @name: site.get.ts
 * @description: This file is the API endpoint for fetching all of the information about the website
 * In order for this to work, you have to have a database table called 'website' with the following columns:
 * - id: integer/UUID, primary key, auto-increment
 * - name: The name of the website/brand
 * - description: The description about your website/brand.
 * - keywords: Keywords/tags related to your website/brand
 * - url: The URL of the website
 * - country: Where the brand is based.
 * - contact_email_address: Your email address to allow viewers to contact you through email
 * - contact_phone_number: Your phone number to allow viewers to call you
 * - copyright: The copyright text in the footer
 * 
 */

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event): Promise<WebsiteResponse> => {
  try {
    const supabase = await serverSupabaseClient(event)
  
    const { data, error } = await supabase.from('website').select('*')
  
    if (error) {
     throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch website data',
        data: error.message
      })
    }
     if (!data || data.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Website data not found',
        data: 'No website configuration exists in the database'
      })
    }

    return data[0] as WebsiteResponse
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