import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <Sidebar />
        <div className="ml-[220px] flex min-h-screen w-[calc(100%-220px)] flex-col">
          <TopHeader />
          <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
