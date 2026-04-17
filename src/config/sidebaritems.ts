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
        icon: 'mdi:view-dashboard-outline', // better dashboard icon
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
        icon: 'mdi:account-group-outline', // group of users
        id: uniqueId(),
        children:[
            {
            id: uniqueId(),
            name: 'Manage Users',
            icon: 'mdi:cog-outline',
            url: '/users',
          },
          {
            id: uniqueId(),
            name: 'Roles',
            icon: 'mdi:cog-outline',
            url: '/admin/roles',
          },
          {
            id: uniqueId(),
            name: 'Departments',
            icon: 'mdi:cog-outline',
            url: '/admin/departments',
          },
          {
            id: uniqueId(),
            name: 'Permissions',
            icon: 'mdi:cog-outline',
            url: '/admin/permissions',
          },
          {
            id: uniqueId(),
            name: 'RDP',
            icon: 'mdi:cog-outline',
            url: '/admin/rdp',
          },
        ]
      },
    ],
  },
  {
    heading: 'Sales',
    children: [
      {
        name: 'Clients',
        id: uniqueId(),
        icon: 'mdi:account-tie-outline', // business client
        url: '/clients',
      },
      {
        name: 'Vendors',
        id: uniqueId(),
        icon: 'mdi:store-outline', // vendor/shop
        url: '/vendors',
      },
      {
        name: 'Campaign',
        id: uniqueId(),
        icon: 'mdi:bullhorn-outline', // marketing campaign
        children: [
          {
            id: uniqueId(),
            name: 'Manage Campaign',
            icon: 'mdi:cog-outline',
            url: '/campaigns',
          },
          {
            id: uniqueId(),
            name: 'Campaign Ops View',
            icon: 'mdi:eye-outline',
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
        icon: 'mdi:shield-check-outline', // monitoring / protection
        children: [
          {
            id: uniqueId(),
            name: 'Batches',
            icon: 'mdi:layers-outline',
            url: '/sentinel-batches',
          },
          {
            id: uniqueId(),
            name: 'Jobs',
            icon: 'mdi:briefcase-outline',
            url: '/sentinel-jobs',
          },
          {
            id: uniqueId(),
            name: 'Campaigns',
            icon: 'mdi:bullhorn-outline',
            url: '/sentinel-campaigns',
          },
        ],
      },
    ],
  }
];

export default SidebarContent;
