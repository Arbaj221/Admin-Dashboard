import SidebarContent from '../../config/sidebaritems';
import SimpleBar from 'simplebar-react';
import { Icon } from '@iconify/react';
import FullLogo from '../../assets/images/logos/FullLogo';
import { Link, useLocation } from 'react-router';
import { useTheme } from 'src/theme/theme-provider';
import { AMLogo, AMMenu, AMMenuItem, AMSidebar, AMSubmenu } from 'tailwind-sidebar';
import 'tailwind-sidebar/styles.css';
import { useSidebarCollapse } from 'src/context/useSidebarCollapse';
import { useSidebarMenu } from 'src/permissions/useSidebarMenu';

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

const renderSidebarItems = (
  items: SidebarItemType[],
  currentPath: string,
  collapsed: boolean,
  onClose?: () => void,
  isSubItem: boolean = false,
) => {
  return items.map((item) => {
    const isSelected = currentPath === item?.url;
    const IconComp = item.icon || null;

    const iconElement = IconComp ? (
      <Icon icon={IconComp} height={21} width={21} />
    ) : (
      <Icon icon={'ri:checkbox-blank-circle-line'} height={9} width={9} />
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

    // Submenu — hide children labels when collapsed, show only icon
    if (item.children?.length) {
      if (collapsed) {
        return (
          <div key={item.id} className="flex justify-center my-0.5">
            <span
              className="flex items-center justify-center w-10 h-10 rounded-md text-sidebar-foreground hover:bg-lightprimary hover:text-primary transition-colors duration-200 cursor-pointer"
              title={item.name}
            >
              {iconElement}
            </span>
          </div>
        );
      }
      return (
        <AMSubmenu
          key={item.id}
          icon={iconElement}
          title={item.name}
          ClassName="mt-0.5 text-sidebar-foreground dark:text-sidebar-foreground"
        >
          {renderSidebarItems(item.children, currentPath, collapsed, onClose, true)}
        </AMSubmenu>
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
      ? `mt-0.5 text-sidebar-foreground dark:text-sidebar-foreground !hover:bg-transparent ${
          isSelected ? '!bg-transparent !text-primary' : ''
        }`
      : `mt-0.5 text-sidebar-foreground dark:text-sidebar-foreground`;

    return (
      <div onClick={onClose} key={item.id}>
        <AMMenuItem
          icon={iconElement}
          isSelected={isSelected}
          link={item.url || undefined}
          target={linkTarget}
          badge={!!item.isPro}
          badgeColor="bg-lightsecondary"
          badgeTextColor="text-secondary"
          disabled={item.disabled}
          badgeContent={item.isPro ? 'Pro' : undefined}
          component={Link}
          className={`${itemClassNames}`}
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
        <div className={`${collapsed ? 'px-2' : 'px-6'} transition-all duration-300`}>
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