import { useState } from "react";
import Sidebar from "./header/SideBar";
import Navbar from "./header/NavBar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../../layouts/ScrollToTop";
function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen bg-background">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div
          className={`flex flex-col flex-1 overflow-hidden transition-all duration-300
    ${sidebarOpen ? "lg:ml-64" : "lg:ml-64"}`}
        >
          <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-y-auto  dark:bg-gray-800">
            <div className="p-6 max-w-7xl mx-auto">
              <ScrollToTop />
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
export default AdminLayout;
