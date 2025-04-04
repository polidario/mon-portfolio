declare global {
    interface AppLink {
        id: number | string;
        label: string;
        path: string;
    }

    interface AppSocialLink {
        id: number | string;
        label: string;
        icon: string;
        url: string;
    }

    interface AppLinksResponse {
        links: AppLink[];
        social_links: AppSocialLink[];
        error?: string;
    }
}