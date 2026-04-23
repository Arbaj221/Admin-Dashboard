// permissionUtils.ts

import { PermissionMap, ModuleKey, ActionKey } from './permissions.types';

// ✅ Normalize (important for future safety)
export function normalizePermissions(data: PermissionMap): PermissionMap {
  const result: PermissionMap = {};

  Object.keys(data || {}).forEach((module) => {
    result[module.toLowerCase()] = (data[module] || []).map((action) =>
      action.toLowerCase()
    );
  });

  return result;
}

// ✅ Check specific permission
export function hasAccess(
  permissions: PermissionMap,
  module: ModuleKey,
  action: ActionKey
): boolean {
  if (!permissions) return false;

  const mod = module.toLowerCase();
  const act = action.toLowerCase();

  return permissions[mod]?.includes(act) ?? false;
}

// ✅ Check module-level access (for sidebar)
export function hasModuleAccess(
  permissions: PermissionMap,
  module: ModuleKey
): boolean {
  if (!permissions) return false;

  const mod = module.toLowerCase();

  return (permissions[mod]?.length ?? 0) > 0;
}