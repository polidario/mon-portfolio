/***
 * @name: experiences.get.ts
 * @description: This file is the API endpoint for fetching all of the information about the website
 * In order for this to work, you have to have a database table called 'website' with the following columns:
 * - id: integer/UUID, primary key, auto-increment
 * - title: The title of the job you performed
 * - company: The name of the company
 * - worked_from: Date - When did you start to work?
 * - worked_until: Date - When did you stop working?
 * - url: The URL of the company
 * - description: Job description
 * 
 */

import { serverSupabaseClient } from '#supabase/server'

interface WorkExperience {
    id: number | string;
    title: string;
    company: string;
    worked_from: string;
    worked_until: string;
    url: string;
    description: string;
}

function formatDateRange(from: string, until: string | null): string {
    const fromDate = new Date(from);
    const fromFormatted = fromDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    if (!until) {
      return `${fromFormatted} - Present`;
    }
    
    const untilDate = new Date(until);
    const untilFormatted = untilDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    return `${fromFormatted} - ${untilFormatted}`;
}

export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event)

    const { data, error } = await supabase.from('work_experiences').select('*').order('worked_from', { ascending: false });

    if (error) {
        return {
        data: [],
        error: error!.message
        }
    }

    return data.map((exp: WorkExperience) => ({
        id: exp.id,
        title: exp.title,
        subtitle: exp.company,
        description: exp.description,
        date: formatDateRange(exp.worked_from, exp.worked_until),
        url: exp.url || null
    }));
    
})