import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, User, LogOut, Search, Settings } from "lucide-react";
import { authservice } from "../../Laravel/Auth";
import SearchBar from "../SearchBar";
import { useLogout } from "../LogoutBtn";
import UserMiniCard from "../User/UserMiniCard";

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState(null);
  const logout = useLogout();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authservice.getUser();
        if (response.success) setUser(response.user);
      } catch (error) {
        console.error("Error in getUser:", error);
      }
    };
    fetchUser();
  }, []);

  const navbarlg = [
    { name: "Home", icon: <Home size={20} />, to: "/" },
    {
      name: "Profile",
      icon: <User size={20} />,
      to: user ? `/${user.name}/${user.id}/profile` : "/login",
    },
    {
      name: "Followers",
      icon: <Users size={20} />,
      to: `/follower`,
    },
    { name: "Setting", icon: <Settings size={20} />, to: "/setting" },
  ];

  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:h-screen sticky top-0 bg-white dark:bg-gray-900 shadow-lg z-40">
        <div className="flex flex-col items-center py-8 border-b-2 border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-500">
            Code<span className="text-gray-900 dark:text-white">With</span>Ahmad
          </h1>
        </div>

        <div className="flex-1 px-4 py-6">
          <ul className="space-y-2 font-medium">
            {navbarlg.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white"
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="ms-3">{item.name}</span>
                </NavLink>
              </li>
            ))}

            {/* Logout Button */}
            <li>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 w-full text-left text-gray-700 dark:text-gray-200 hover:bg-red-600 hover:text-white rounded-lg transition-all"
              >
                <LogOut size={20} />
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* --- MOBILE TOP NAV --- */}
      <div className="flex justify-between items-center w-full px-4 py-3 bg-white dark:bg-gray-800 md:hidden shadow-sm sticky top-0 z-50">
        {/* Left: User Avatar */}
        {/* <div>
          {/* Code<span className="text-gray-900 dark:text-white">With</span>Ahmad 
        </div> */}

        {/* Middle: Navigation Icons */}
        <ul className="flex flex-row justify-center gap-x-8 items-center">
          {navbarlg.slice(0, 3).map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600"
                    : "text-gray-500 dark:text-gray-300 hover:text-blue-600"
                }
              >
                {item.icon}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 text-gray-500 dark:text-gray-300 hover:text-blue-600 transition-all"
            >
              <Search size={22} />
            </button>
          </li>
        </ul>

        {/* Right: Search */}
        <div>
          <UserMiniCard user={user} isDropdown />
        </div>
      </div>

      {/* --- SEARCHBAR COMPONENT --- */}
      <SearchBar isOpen={showSearch} setIsOpen={setShowSearch} />
    </>
  );
}

export default Header;
