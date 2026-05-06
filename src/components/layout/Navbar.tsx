import { Icon } from '@iconify/react';
import Profile from './navbar-items/Profile';
import { useTheme } from 'src/theme/theme-provider';
import Search from './navbar-items/Search';
import FullLogo from '../../assets/images/logos/FullLogo';
import Messages from './navbar-items/Messages';
import { useSidebarCollapse } from 'src/context/useSidebarCollapse';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { collapsed, toggleCollapsed } = useSidebarCollapse();

  const toggleMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    // ✅ sticky top-0 works now because body-wrapper is the scroll container
    <header className="sticky top-0 z-50 bg-white dark:bg-dark border-b border-border">
      <nav className="rounded-none bg-transparent dark:bg-transparent py-4 px-6 max-w-full! flex justify-between items-center">

        {/* Left side: Toggle + Search */}
        <div className="hidden xl:flex items-center gap-2">
          <button
            onClick={toggleCollapsed}
            className="flex items-center justify-center w-9 h-9 rounded-md text-foreground dark:text-muted-foreground hover:text-primary hover:bg-lightprimary transition-colors duration-200 focus:outline-none"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon
              icon={collapsed ? 'tabler:layout-sidebar-right' : 'tabler:layout-sidebar'}
              width="20"
            />
          </button>

          <Search />
        </div>

        {/* Mobile logo */}
        <div className="block xl:hidden">
          <FullLogo />
        </div>

        <div className="xl:block! hidden! md:hidden!">
          <div className="flex gap-0 items-center">

            {/* Theme Toggle */}
            {theme === 'light' ? (
              <div
                className="hover:text-primary px-15 group dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-foreground dark:text-muted-foreground relative"
                onClick={toggleMode}
              >
                <span className="flex items-center justify-center relative after:absolute after:w-10 after:h-10 after:rounded-full after:-top-1/2 group-hover:after:bg-lightprimary">
                  <Icon icon="tabler:moon" width="20" />
                </span>
              </div>
            ) : (
              <div
                className="hover:text-primary px-15 dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-foreground dark:text-muted-foreground group relative"
                onClick={toggleMode}
              >
                <span className="flex items-center justify-center relative after:absolute after:w-10 after:h-10 after:rounded-full after:-top-1/2 group-hover:after:bg-lightprimary">
                  <Icon
                    icon="solar:sun-bold-duotone"
                    width="20"
                    className="group-hover:text-primary"
                  />
                </span>
              </div>
            )}

            {/* Messages Dropdown */}
            <Messages />

            {/* Profile Dropdown */}
            <Profile />

          </div>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;