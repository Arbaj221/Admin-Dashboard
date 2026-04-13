import { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarCollapseContextType {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const SidebarCollapseContext = createContext<SidebarCollapseContextType>({
  collapsed: false,
  toggleCollapsed: () => {},
});

export const SidebarCollapseProvider = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  return (
    <SidebarCollapseContext.Provider value={{ collapsed, toggleCollapsed }}>
      {children}
    </SidebarCollapseContext.Provider>
  );
};

export const useSidebarCollapse = () => useContext(SidebarCollapseContext);