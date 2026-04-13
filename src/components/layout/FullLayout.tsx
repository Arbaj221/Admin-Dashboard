import { FC } from 'react';
import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';

const FullLayout: FC = () => {
  return (
    <>
      <div className="flex w-full min-h-screen">
      <div className="page-wrapper flex w-full">

        {/* Add flex flex-col here */}
          <div className="xl:block hidden">
            <Sidebar />
          </div>
        <div className="body-wrapper w-full bg-white dark:bg-dark flex flex-col min-h-screen">
          
          <Navbar />

          {/* Add flex-1 here so it grows and pushes footer down */}
          <div className="container mx-auto py-15 flex-1">
            <main className="grow">
              <Outlet />
            </main>
          </div>

          <Footer />
        </div>

      </div>
    </div>
    </>
  );
};

export default FullLayout;
