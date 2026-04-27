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
        <div className="block">
          <Sidebar />
        </div>

        {/* Body — margin animates via CSS */}
        {/* Body — margin is controlled via CSS using [data-collapsed] on .page-wrapper.
           See sidebar.css → .body-wrapper and [data-collapsed="true"] .body-wrapper.
           Do NOT add inline margin-left here — update --sidebar-width in globals.css instead. */}
        <div className="body-wrapper w-full bg-white dark:bg-dark flex flex-col min-h-screen transition-[margin-left] duration-300 ease-in-out min-w-0 overflow-x-hidden">
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