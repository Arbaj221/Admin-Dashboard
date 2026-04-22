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
  isPro?: boolean;
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
  isPro?: boolean;
}

import { uniqueId } from 'lodash';

const SidebarContent: MenuItem[] = [
  // ==================== NON-PRO SECTIONS ====================
  {
    heading: 'Home',
    children: [
      {
        name: 'Dashboard',
        icon: 'lucide:layout-dashboard',
        id: uniqueId(),
        url: '/',
      },
    ],
  },
  {
    heading: 'Admin',
    children: [
      {
        name: 'User Management',
        icon: 'lucide:users',
        id: uniqueId(),
        children: [
          {
            id: uniqueId(),
            name: 'All Users',
            icon: 'lucide:user',
            url: '/users',
          },
          {
            id: uniqueId(),
            name: 'Roles',
            icon: 'lucide:shield-check',
            url: '/admin/roles',
          },
          {
            id: uniqueId(),
            name: 'Departments',
            icon: 'lucide:building-2',
            url: '/admin/departments',
          },
          {
            id: uniqueId(),
            name: 'Module Permissions',
            icon: 'lucide:lock-keyhole',
            url: '/admin/module-permissions',
          },
          {
            id: uniqueId(),
            name: 'Role Department Permissions',
            icon: 'lucide:monitor',
            url: '/admin/rdp',
          },
          {
            id: uniqueId(),
            name: 'User Permission',
            icon: 'lucide:user-lock',
            url: '/admin/userpermission',
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
        icon: 'lucide:briefcase',
        url: '/clients',
      },
      {
        name: 'Vendors',
        id: uniqueId(),
        icon: 'lucide:store',
        url: '/vendors',
      },
      {
        name: 'Campaigns',
        id: uniqueId(),
        icon: 'lucide:megaphone',
        children: [
          {
            id: uniqueId(),
            name: 'All Campaigns',
            icon: 'lucide:list',
            url: '/campaigns',
          },
          {
            id: uniqueId(),
            name: 'Ops View',
            icon: 'lucide:eye',
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
        icon: 'lucide:shield',
        children: [
          {
            id: uniqueId(),
            name: 'Batches',
            icon: 'lucide:layers',
            url: '/sentinel-batches',
          },
          {
            id: uniqueId(),
            name: 'Jobs',
            icon: 'lucide:play-circle',
            url: '/sentinel-jobs',
          },
          {
            id: uniqueId(),
            name: 'Campaigns',
            icon: 'lucide:bar-chart-2',
            url: '/sentinel-campaigns',
          },
        ],
      },
    ],
  },
];

export default SidebarContent;