import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

function Layout() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <div className="flex">
        <Sidebar />
        <div className="ml-[220px] flex min-h-screen w-[calc(100%-220px)] flex-col">
          <TopHeader />
          <main className="flex-1 overflow-y-auto bg-[hsl(var(--background))] p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
