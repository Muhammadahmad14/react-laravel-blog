import { useState } from "react";
import { Menu, Search, Bell, LogOut, Settings, Sun, Moon } from "lucide-react";
import { useLogout } from "../../LogoutBtn";
import { getUser } from "../../../utils/auth";
import { useTheme } from "../../../context/ThemeContext";

function Navbar({ onMenuClick }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isDark] = useState(theme === "dark" ? true : false);
  const logout = useLogout();
  const user = getUser();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4 flex-1 lg:flex-none">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu size={24} className="text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={isDark ? "Light Mode" : "Dark Mode"}
          >
            {isDark ? (
              <Sun size={20} className="text-yellow-500" />
            ) : (
              <Moon size={20} className="text-gray-700 dark:text-gray-200" />
            )}
          </button>

          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
            <Bell size={20} className="text-gray-700 dark:text-gray-200" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm"
            >
              <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
                {user?.name}
              </span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700  dark:text-gray-200 rounded-lg shadow-lg py-2 animate-fade-in">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors">
                  <Settings
                    size={16}
                    className="text-gray-700 dark:text-gray-200"
                  />
                  Profile Settings
                </button>
                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                  onClick={logout}
                >
                  <LogOut
                    size={16}
                    className="text-gray-700 dark:text-gray-200"
                  />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
