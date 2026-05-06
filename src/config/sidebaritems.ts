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
  module?: string;
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
  module?: string;
}

import { uniqueId } from 'lodash';

const SidebarContent: MenuItem[] = [
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
        icon: 'lucide:users',                       // group of users
        id: uniqueId(),
        children: [
          {
            id: uniqueId(),
            name: 'All Users',
            icon: 'lucide:user',
            url: '/users',
            module: 'users'
          },
          {
            id: uniqueId(),
            name: 'Roles',
            icon: 'lucide:shield-check',            // ✅ was lucide:shield (conflict with Sentinel)
            url: '/admin/roles',
            module: 'roles'
          },
          {
            id: uniqueId(),
            name: 'Departments',
            icon: 'lucide:building-2',              // ✅ more specific building
            url: '/admin/departments',
            module: 'department'
          },
          {
            id: uniqueId(),
            name: 'Module Permissions',
            icon: 'lucide:key-round',
            url: '/admin/module-permissions',
            module: 'module-permissions'
          },
          {
            id: uniqueId(),
            name: 'Role Department Permissions',
            icon: 'lucide:network',
            url: '/admin/rdp',
            module: 'role-department-permissions'
          },
          {
            id: uniqueId(),
            name: 'User Permission',
            icon: 'lucide:user-check',              // ✅ was lucide:user-cog
            url: '/admin/userpermission',
            module: 'users-permissions'
          },
          {
            id: uniqueId(),
            name: 'App Settings',
            icon: 'lucide:settings-2',              // ✅ more distinct settings icon
            url: '/admin/app-settings',
            module: 'settings'
          },
        ],
      }
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
        module: 'client'
      },
      {
        name: 'Vendors',
        id: uniqueId(),
        icon: 'lucide:store',
        url: '/vendors',
        module: 'vendor'
      },
      {
        name: 'Campaigns',
        id: uniqueId(),
        icon: 'lucide:megaphone',
        children: [
          {
            id: uniqueId(),
            name: 'All Campaigns',
            icon: 'lucide:layout-list',             // ✅ was lucide:list
            url: '/campaigns',
            module: 'campaign'
          },
          {
            id: uniqueId(),
            name: 'Campaign Segment',
            icon: 'lucide:git-branch',
            url: '/campaigns-segment',
            module: 'campaign_segment'
          },
          {
            id: uniqueId(),
            name: 'Ops View',
            icon: 'lucide:telescope',              // ✅ was lucide:eye — more "ops" feel
            url: '/campaigns-ops-view',
            module: 'campaigns-ops-view'
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
        icon: 'lucide:radar',                      // ✅ was lucide:shield (conflict) — radar fits "sentinel"
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
            icon: 'lucide:circle-play',            // ✅ was lucide:play-circle
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
  {
    heading: 'Reports',
    children: [
      {
        name: 'Revenue',
        id: uniqueId(),
        icon: 'lucide:circle-dollar-sign',         // ✅ was lucide:notepad-text — more "revenue" feel
        url: '/reports/revenue',
        module: 'revenue'
      },
    ],
  },
];

export default SidebarContent;