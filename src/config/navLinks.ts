export interface ChildItem {
    id?: number | string;
    name?: string;
    icon?: string;
    children?: ChildItem[];
    item?: unknown;
    url?: string;
    color?: string;
    disabled?: boolean;
    subtitle?: string;
    badge?: boolean;
    badgeType?: string;
}

export interface MenuItem {
    heading?: string;
    name?: string;
    icon?: string;
    id?: number;
    to?: string;
    items?: MenuItem[];
    children?: ChildItem[];
    url?: string;
    disabled?: boolean;
    subtitle?: string;
    badgeType?: string;
    badge?: boolean;
}

import { uniqueId } from 'lodash';

const NavbarContent: MenuItem[] = [
    // ==================== NON-PRO SECTIONS ====================
    {
        heading: 'Home',
        children: [
            {
                name: 'Modern',
                icon: 'solar:widget-2-linear',
                id: uniqueId(),
                url: '/',
            },
        ],
    },
    {
        heading: 'Admin',
        children: [
            {
                name: 'Users',
                icon: 'solar:widget-2-linear',
                id: uniqueId(),
                children: [
                    {
                        id: uniqueId(),
                        name: 'Users',
                        url: '/users',
                    },
                ],
            },
        ],
    },
    {
        heading: 'Sales',
        children: [
            {
                name: 'Clients',
                id: uniqueId(),
                icon: 'solar:login-2-linear',
                children: [
                    {
                        id: uniqueId(),
                        name: 'Manage Clients',
                        url: '/clients',
                    },
                ],
            },
            {
                name: 'Vendors',
                id: uniqueId(),
                icon: 'solar:user-plus-rounded-linear',
                children: [
                    {
                        id: uniqueId(),
                        name: 'Manage Vendors',
                        url: '/vendors',
                    },
                ],
            },
            {
                name: 'Campaign',
                id: uniqueId(),
                icon: 'solar:user-plus-rounded-linear',
                children: [
                    {
                        id: uniqueId(),
                        name: 'Manage Campaign',
                        url: '/campaigns',
                    },
                    {
                        id: uniqueId(),
                        name: 'Campaign Ops View',
                        url: '/campaigns-ops-view',
                    },
                ],
            },
        ],
    },
    {
        heading: 'Operations',
        children: [
            {
                name: 'Sentinel',
                id: uniqueId(),
                icon: 'solar:login-2-linear',
                children: [
                    {
                        id: uniqueId(),
                        name: 'batches',
                        url: '/sentinel-batches',
                    },
                    {
                        id: uniqueId(),
                        name: 'Jobs',
                        url: '/sentinel-jobs',
                    },
                    {
                        id: uniqueId(),
                        name: 'Campaigns',
                        url: '/sentinel-campaigns',
                    },
                ],
            },
        ],
    }
];

export default NavbarContent;
