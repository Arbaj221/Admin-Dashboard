import { FC } from 'react';
import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { SidebarCollapseProvider, useSidebarCollapse } from 'src/context/useSidebarCollapse';

// Inner layout reads from context so margin responds to collapsed state
const LayoutContent: FC = () => {
  const { collapsed } = useSidebarCollapse();

  return (
    <div className="flex w-full min-h-screen">
      <div className="page-wrapper flex w-full" data-collapsed={collapsed}>
        {/* Desktop Sidebar */}
        <div className="xl:block hidden">
          <Sidebar />
        </div>

        {/* Body — margin animates via CSS */}
        <div
          className="body-wrapper w-full bg-white dark:bg-dark flex flex-col min-h-screen transition-[margin-left] duration-300 ease-in-out"
          style={{ marginLeft: collapsed ? '72px' : '270px' }}
        >
          <Navbar />

          <div className="container mx-auto p-4 flex-1">
            <main className="grow">
              <Outlet />
            </main>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

const FullLayout: FC = () => {
  return (
    <SidebarCollapseProvider>
      <LayoutContent />
    </SidebarCollapseProvider>
  );
};

export default FullLayout;