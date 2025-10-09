export interface WebsiteResponse {
    id: number | string;
    label?: string;
    path?: string;
    name: string;
    description: string;
    keywords?: string;
    url: string;
    country?: string;
    contact_email_address?: string;
    contact_phone_number?: string;
    copyright?: string;
    logo_url?: string;
    profile_photo_url: string;
    created_at?: Date;
    updated_at?: Date;
    is_active?: boolean;
}