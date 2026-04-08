import { useState, useEffect, useEffectEvent, useRef } from 'react';
import { Icon } from '@iconify/react';
import Profile from './Profile';
import { useTheme } from 'src/theme/theme-provider';
import Search from './Search';
import { Link, useLocation } from 'react-router';
import FullLogo from '../../../assets/images/logos/FullLogo';
import NavbarContent, { MenuItem } from '../../../config/navLinks';
import Messages from './Messages';

// Dropdown component for nav items with children
const NavDropdown = ({ item, currentPath }: { item: MenuItem; currentPath: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = item.children?.some(
    (child) =>
      child.url === currentPath ||
      child.children?.some((sub) => sub.url === currentPath),
  );

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <button
        className={`flex items-center gap-1 px-3 py-5 text-sm font-medium border-b-2 transition-colors duration-150 cursor-pointer
          ${isActive
            ? 'border-primary text-primary'
            : 'border-transparent text-foreground hover:text-primary'
          }`}
      >
        {item.name}
        <Icon
          icon="tabler:chevron-down"
          width={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute top-full left-0 mt-0 min-w-48 bg-popover border border-border rounded-md shadow-md z-50 overflow-hidden
          transition-all duration-200 origin-top
          ${isOpen ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-y-95 -translate-y-1 pointer-events-none'}`}
      >
        {item.children?.map((child) => {
          // Child has its own children — render as group
          if (child.children?.length) {
            return (
              <div key={child.id}>
                <div className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {child.name}
                </div>
                {child.children.map((sub) => (
                  <Link
                    key={sub.id}
                    to={sub.url || '/'}
                    className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-150
                      ${currentPath === sub.url
                        ? 'text-primary bg-lightprimary'
                        : 'text-foreground hover:text-primary hover:bg-lightprimary'
                      }`}
                  >
                    {sub.name}
                    {sub.isPro && (
                      <span className="ml-auto text-xs bg-lightsecondary text-secondary px-1.5 py-0.5 rounded">
                        Pro
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            );
          }

          // Direct link
          return (
            <Link
              key={child.id}
              to={child.url || '/'}
              className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-150
                ${currentPath === child.url
                  ? 'text-primary bg-lightprimary'
                  : 'text-foreground hover:text-primary hover:bg-lightprimary'
                }`}
            >
              {child.icon && <Icon icon={child.icon} width={16} />}
              {child.name}
              {child.isPro && (
                <span className="ml-auto text-xs bg-lightsecondary text-secondary px-1.5 py-0.5 rounded">
                  Pro
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// Single nav link (no children)
const NavLink = ({ item, currentPath }: { item: MenuItem; currentPath: string }) => {
  const isActive = currentPath === item.url;

  return (
    <Link
      to={item.url || '/'}
      className={`flex items-center px-3 py-5 text-sm font-medium border-b-2 transition-colors duration-150
        ${isActive
          ? 'border-primary text-primary'
          : 'border-transparent text-foreground hover:text-primary'
        }`}
    >
      {item.name}
    </Link>
  );
};

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const handleScroll = useEffectEvent(() => {
    setIsSticky(window.scrollY > 50);
  });

  const handleResize = useEffectEvent(() => { });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header
      className={`sticky top-0 z-10 transition-shadow duration-300 bg-sidebar dark:bg-sidebar border-b border-border
        ${isSticky ? 'shadow-md' : ''}`}
    >
      <nav className="px-6 max-w-full flex items-center justify-between gap-4">

        {/* Left — Logo */}
        <div className="flex items-center shrink-0">
          <Link to="/">
            <FullLogo />
          </Link>
        </div>

        {/* Center — Nav Links */}
        <div className="flex items-center flex-1">
          {NavbarContent.map((section, index) => {
            // Section with children that have sub-children = dropdown
            if (section.children?.length) {
              const hasSubChildren = section.children.some((c) => c.children?.length || c.url);

              if (hasSubChildren) {
                // Build a MenuItem-like object for the dropdown
                const dropdownItem: MenuItem = {
                  id: index,
                  name: section.heading,
                  children: section.children,
                };

                // If only one child with a direct URL — render as simple link
                if (section.children.length === 1 && section.children[0].url) {
                  return (
                    <NavLink
                      key={index}
                      item={{
                        id: index,
                        name: section.heading,
                        url: section.children[0].url,
                      }}
                      currentPath={pathname}
                    />
                  );
                }

                return (
                  <NavDropdown
                    key={index}
                    item={dropdownItem}
                    currentPath={pathname}
                  />
                );
              }
            }
            return null;
          })}
        </div>

        {/* Right — Search + Theme + Profile */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Search */}
          <div className="hidden xl:flex items-center">
            <Search />
          </div>

          {/* Theme Toggle */}
          <div
            className="hover:text-primary px-15 group dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-foreground dark:text-muted-foreground relative"
            onClick={toggleMode}
          >
            <span className="flex items-center justify-center relative after:absolute after:w-10 after:h-10 after:rounded-full after:-top-1/2 group-hover:after:bg-lightprimary">
              {theme === 'light' ? (
                <Icon icon="tabler:moon" width="20" />
              ) : (
                <Icon icon="solar:sun-bold-duotone" width="20" className="group-hover:text-primary" />
              )}
            </span>
          </div>

          <div className="">
            <Messages />
          </div>

          <div className="">
            <Profile />
          </div>
        </div>

      </nav>
    </header>
  );

};

export default Header;