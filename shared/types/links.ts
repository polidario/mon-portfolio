export interface AppLink {
    id: number | string;
    label: string;
    path: string;
}

export interface AppSocialLink {
    id: number | string;
    label: string;
    icon: string;
    url: string;
}

export interface AppLinksResponse {
    links: AppLink[];
    social_links: AppSocialLink[];
    error?: string;
}