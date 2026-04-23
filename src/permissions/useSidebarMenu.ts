import { useMemo } from 'react';
import { usePermission } from 'src/permissions/usePermission';

export const useSidebarMenu = (menu: any[]) => {
  const { canAccess } = usePermission();

  const filterItems = (items: any[]): any[] => {
    return items
      .map((item) => {
        // If item has module → check permission
        if (item.module && !canAccess(item.module)) {
          return null;
        }

        // If children → filter recursively
        if (item.children) {
          const filteredChildren = filterItems(item.children);

          // If no children left → hide parent
          if (filteredChildren.length === 0) {
            return null;
          }

          return { ...item, children: filteredChildren };
        }

        return item;
      })
      .filter(Boolean);
  };

  return useMemo(() => {
    return menu
      .map((section) => {
        if (!section.children) return section;

        const filteredChildren = filterItems(section.children);

        // Hide section if empty
        if (filteredChildren.length === 0) {
          return null;
        }

        return {
          ...section,
          children: filteredChildren,
        };
      })
      .filter(Boolean);
  }, [menu, canAccess]);
};