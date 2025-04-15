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

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  const { data, error } = await supabase.from('website').select('*')

  if (error) {
    return {
      data: [],
      error: error!.message
    }
  }

  return data[0]
})