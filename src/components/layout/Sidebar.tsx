import SidebarContent from '../../config/sidebaritems';
import SimpleBar from 'simplebar-react';
import { Icon } from '@iconify/react';
import FullLogo from '../../assets/images/logos/FullLogo';
import { Link, useLocation } from 'react-router';
import { useTheme } from 'src/theme/theme-provider';
import { AMLogo, AMMenu, AMMenuItem, AMSidebar } from 'tailwind-sidebar';
import 'tailwind-sidebar/styles.css';
import { useSidebarCollapse } from 'src/context/useSidebarCollapse';
import { useSidebarMenu } from 'src/permissions/useSidebarMenu';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SidebarItemType {
  heading?: string;
  id?: number | string;
  name?: string;
  title?: string;
  icon?: string;
  url?: string;
  children?: SidebarItemType[];
  disabled?: boolean;
  isPro?: boolean;
}

// ✅ Check if any child (or nested child) matches current path
const hasActiveChild = (item: SidebarItemType, currentPath: string): boolean => {
  if (!item.children) return false;
  return item.children.some(
    (child) => child.url === currentPath || hasActiveChild(child, currentPath)
  );
};

// ✅ Smooth collapsible submenu — replaces AMSubmenu for animation
const SmoothSubmenu = ({
  icon,
  title,
  children,
  defaultOpen,
  className,
  isActive,
}: {
  icon: React.ReactNode;
  title?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  isActive?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div className={className}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors duration-200 cursor-pointer
          ${isActive
            ? 'bg-lightprimary text-primary font-semibold hover:bg-lightprimary'
            : 'text-sidebar-foreground font-medium hover:bg-lightprimary hover:text-primary'
          }`}
      >
        <span className="shrink-0">{icon}</span>
        <span className="flex-1 text-left truncate font-medium">{title}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-in-out ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Animated children */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className={`pl-2 mt-0.5 transition-transform duration-300 ease-in-out ${open ? 'translate-y-0' : '-translate-y-2'}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

const renderSidebarItems = (
  items: SidebarItemType[],
  currentPath: string,
  collapsed: boolean,
  onClose?: () => void,
  isSubItem: boolean = false,
) => {
  return items.map((item) => {
    // ✅ Only true if THIS item's URL exactly matches — never a parent
    const isSelected = !item.children && currentPath === item?.url;
    const isParentActive = hasActiveChild(item, currentPath);

    const IconComp = item.icon || null;

    const iconElement = IconComp ? (
      <Icon icon={IconComp} height={isSubItem ? 16 : 20} width={isSubItem ? 16 : 20} />
    ) : (
      // ✅ Better sub-item dot icon
      <Icon icon="lucide:circle-dot" height={12} width={12} className="opacity-60" />
    );

    // Heading — hide when collapsed
    if (item.heading) {
      if (collapsed) {
        return (
          <div key={item.heading} className="my-2 flex justify-center">
            <span className="block w-5 border-t border-border opacity-40" />
          </div>
        );
      }
      return (
        <div className="mb-1" key={item.heading}>
          <AMMenu
            subHeading={item.heading}
            ClassName="hide-menu leading-21 text-sidebar-foreground font-bold uppercase text-xs dark:text-sidebar-foreground"
          />
        </div>
      );
    }

    // Submenu
    if (item.children?.length) {
      if (collapsed) {
        return (
          <div key={item.id} className="flex justify-center my-0.5">
            <span
              className={`flex items-center justify-center w-10 h-10 rounded-md transition-colors duration-200 cursor-pointer
                ${isParentActive
                  ? 'bg-lightprimary text-primary'
                  : 'text-sidebar-foreground hover:bg-lightprimary hover:text-primary'
                }`}
              title={item.name}
            >
              {iconElement}
            </span>
          </div>
        );
      }

      return (
        // ✅ Use our smooth submenu instead of AMSubmenu
        <SmoothSubmenu
          key={item.id}
          icon={iconElement}
          title={item.name}
          defaultOpen={isParentActive}
          isActive={isParentActive}
          className={`mt-0.5 ${isParentActive ? 'text-primary' : 'text-sidebar-foreground dark:text-sidebar-foreground'}`}
        >
          {renderSidebarItems(item.children, currentPath, collapsed, onClose, true)}
        </SmoothSubmenu>
      );
    }

    // Regular menu item
    const linkTarget = item.url?.startsWith('https') ? '_blank' : '_self';

    if (collapsed) {
      return (
        <div key={item.id} className="flex justify-center my-0.5" onClick={onClose}>
          <Link
            to={item.url || '/'}
            target={linkTarget}
            title={item.title || item.name}
            className={`flex items-center justify-center w-10 h-10 rounded-md transition-colors duration-200
              ${isSelected
                ? 'bg-lightprimary text-primary'
                : 'text-sidebar-foreground hover:bg-lightprimary hover:text-primary'
              }`}
          >
            {iconElement}
          </Link>
        </div>
      );
    }

    const itemClassNames = isSubItem
      ? `mt-0.5 transition-colors duration-200 text-sidebar-foreground dark:text-sidebar-foreground ${isSelected ? '!bg-lightprimary !text-primary !font-semibold' : '!hover:bg-lightprimary'}`
      : `mt-0.5 transition-colors duration-200 text-sidebar-foreground dark:text-sidebar-foreground ${isSelected ? '!bg-lightprimary !text-primary !font-semibold' : ''}`;

    return (
      <div onClick={onClose} key={item.id}>
        <AMMenuItem
          icon={iconElement}
          isSelected={isSelected} // ✅ never true for parents
          link={item.url || undefined}
          target={linkTarget}
          badge={!!item.isPro}
          badgeColor="bg-lightsecondary"
          badgeTextColor="text-secondary"
          disabled={item.disabled}
          badgeContent={item.isPro ? 'Pro' : undefined}
          component={Link}
          className={itemClassNames}
        >
          <span className="truncate flex-1">{item.title || item.name}</span>
        </AMMenuItem>
      </div>
    );
  });
};

const SidebarLayout = ({ onClose }: { onClose?: () => void }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const { theme } = useTheme();
  const { collapsed } = useSidebarCollapse();

  const sidebarMode = theme === 'light' || theme === 'dark' ? theme : undefined;
  const filteredMenu = useSidebarMenu(SidebarContent);

  return (
    <AMSidebar
      collapsible="none"
      animation={true}
      showProfile={false}
      width={collapsed ? '72px' : '270px'}
      showTrigger={false}
      mode={sidebarMode}
      className="fixed left-0 top-0 border border-border dark:border-border bg-sidebar dark:bg-sidebar z-10 h-screen overflow-hidden transition-[width] duration-300 ease-in-out"
    >
      {/* Logo */}
      <div className={`px-4 flex items-center brand-logo overflow-hidden ${collapsed ? 'justify-center' : ''}`}>
        <AMLogo component={Link} href="/" img="">
          <FullLogo collapsed={collapsed} />
        </AMLogo>
      </div>

      {/* Sidebar items */}
      <SimpleBar className="h-[calc(100vh-100px)]">
        <div className={`${collapsed ? 'px-2' : 'px-3'} transition-all duration-300`}>
          {filteredMenu.map((section, index) => (
            <div key={index}>
              {renderSidebarItems(
                [
                  ...(section.heading ? [{ heading: section.heading }] : []),
                  ...(section.children || []),
                ],
                pathname,
                collapsed,
                onClose,
              )}
            </div>
          ))}
        </div>
      </SimpleBar>
    </AMSidebar>
  );
};

export default SidebarLayout;