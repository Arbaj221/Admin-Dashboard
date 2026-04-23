// permissions.types.ts

export type PermissionMap = Record<string, string[]>;

// Example:
// {
//   users: ['view', 'edit'],
//   vendor: ['view', 'export']
// }

export type ModuleKey = string;
export type ActionKey = string;