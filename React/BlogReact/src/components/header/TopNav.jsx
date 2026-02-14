import { useState } from "react";
import { Settings } from "lucide-react";
import { useLogout } from "../LogoutBtn";

function TopNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const logout = useLogout();

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md flex justify-between items-center px-6 py-3 sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        CodeWithAhmad
      </div>

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <img
            src="https://via.placeholder.com/32"
            alt="Profile"
            className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600"
          />
          <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border 
          border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2"
            onClick={() => setDropdownOpen(false)}
          >
            <button
              className="block w-full text-left px-4 py-2
             hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Profile
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              Settings
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={logout}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default TopNavbar;
