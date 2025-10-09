import type { TimelineItem, IconListItem } from './components'

// API Response Types
export interface ApiError {
    data?: unknown[];
    error: string;
}

// Work Experience Types
export interface WorkExperienceDB {
    id: number | string;
    title: string;
    company: string;
    worked_from: string;
    worked_until: string | null;
    url: string | null;
    description: string;
}

export interface TimelineItemResponse extends TimelineItem {}

// Stack/Technology Types
export interface StackDB {
    id: number | string;
    name: string;
    description: string | null;
    url: string;
    icon: string | null;
    colored_icon: string;
}

export interface StackResponse extends IconListItem {}

// Page Types
export interface PageData {
    enabled: boolean;
    title: string;
    slug: string;
    content: Array<Record<string, unknown>> | null;
}

// Database Link Types
export interface LinkDB {
    id: number | string;
    label: string;
    path: string;
}

export interface SocialLinkDB {
    id: number | string;
    label: string;
    icon: string;
    url: string;
}
