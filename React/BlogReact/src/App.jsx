import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Sugestion from "./components/header/Sugestion";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Mobile Header - Fixed */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-white dark:bg-slate-900 border-b border-gray-300">
        <Header />
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 md:pt-0 pt-16">
        {/* Desktop Sidebar - Hidden on mobile */}
        <aside className="hidden md:block w-64 bg-white dark:bg-slate-900 border-r border-gray-300">
          <div className="sticky top-0 h-screen overflow-hidden">
            <Header />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 max-w-4xl mx-auto min-h-full">
            <Outlet />
          </div>
        </main>

        {/* Right Sidebar - Only on large screens */}
        <aside className="hidden lg:block w-72 bg-white dark:bg-slate-900 border-l border-gray-300">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <Sugestion />
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;