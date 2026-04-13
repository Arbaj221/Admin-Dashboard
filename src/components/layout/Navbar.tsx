import { useState, useEffect, useEffectEvent } from 'react';
import { Icon } from '@iconify/react';
import Profile from './navbar-items/Profile';
import { useTheme } from 'src/theme/theme-provider';
import Search from './navbar-items/Search';
import FullLogo from '../../assets/images/logos/FullLogo';
import Messages from './navbar-items/Messages';


const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isSticky, setIsSticky] = useState(false);

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
      className={`sticky top-0 z-2 ${isSticky ? 'bg-white dark:bg-dark shadow-md fixed w-full' : 'bg-transparent'
        }`}
    >
      <nav className="rounded-none bg-transparent dark:bg-transparent py-4 px-6 max-w-full! flex justify-between items-center">
        {/* Mobile Toggle Icon */}

        <div className="hidden xl:flex items-center gap-2">
          <Search />
        </div>

        {/* mobile-logo */}
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
              // Dark Mode Button
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