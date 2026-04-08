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
        heading: 'Users',
        children: [
            {
                name: 'Users',
                icon: 'solar:widget-2-linear',
                id: uniqueId(),
                url: '/users',
            },
        ],
    },
    {
        heading: 'Clients',
        children: [
            {
                name: 'Clients',
                icon: 'solar:widget-2-linear',
                id: uniqueId(),
                url: '/clients',
            },
        ],
    },
    {
        heading: 'pages',
        children: [
            {
                name: 'Sample Page',
                icon: 'solar:document-add-linear',
                id: uniqueId(),
                url: '/sample-page',
            }
        ],
    },
    {
        heading: 'Auth',
        children: [
            {
                name: 'Login',
                id: uniqueId(),
                icon: 'solar:login-2-linear',
                children: [
                    {
                        id: uniqueId(),
                        name: 'Boxed Login',
                        url: '/login',
                    },
                ],
            },
            {
                name: 'Register',
                id: uniqueId(),
                icon: 'solar:user-plus-rounded-linear',
                children: [
                    {
                        id: uniqueId(),
                        name: 'Boxed Register',
                        url: '/register',
                    },
                ],
            },
        ],
    }
];

export default NavbarContent;
