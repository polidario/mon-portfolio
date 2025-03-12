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