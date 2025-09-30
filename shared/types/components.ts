export interface BadgeType {
    type: 'info' | 'error' | 'success' | 'warning';
}

export interface IconListItem {
    id: number;
    name: string;
    description?: string;
    url?: string;
    icon?: string;
    colored_icon?: string;
}

export interface TimelineItem {
    id: string | number;
    title: string;
    subtitle?: string;
    description: string;
    date: string;
    icon?: string;
    color?: string;
    badge?: BadgeType;
    url?: string;
}