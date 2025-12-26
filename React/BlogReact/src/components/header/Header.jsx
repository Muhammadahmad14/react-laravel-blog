import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Home, Users, User, LogOut, Search } from "lucide-react";
import { authservice } from "../../Laravel/Auth";

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authservice.getUser();
        if (response.success) {
          setUser(response.user);
        } else {
          console.log("response.success is false or missing");
        }
      } catch (error) {
        console.error("Error in getUser:", error);
      }
    };

    fetchUser();
  }, []);

  const navbarlg = [
    { name: "Home", icon: <Home size={20} />, to: "/" },
    { name: "Profile", icon: <User size={20} />, to: `/${user?.name}/${user?.id}/profile` },
    { name: "Followers", icon: <Users size={20} />, to: "/followers" },
    { name: "Log Out", icon: <LogOut size={20} />, to: "/logout" },
  ];

  return (
    <>
      {/* ✅ Sidebar for large screens  and medium screens*/}
      <aside
        id="logo-sidebar"
        className="hidden md:flex md:flex-col md:w-64 md:h-screen bg-white dark:bg-gray-900 shadow-lg"
        aria-label="Sidebar"
      >
        {/* Profile Section */}
        <div className="flex flex-col items-center py-8 border-b-2 border-gray-200 dark:border-gray-700">
          <div className="relative">
            <img
              src={user?.profile_img || "default_image.jpg"}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default_image.jpg";
              }}
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
          </div>
          <Link to={`/${user?.name}/${user?.id}/profile`}>
            <h2 className="text-lg font-semibold text-blue-600 mt-3">
              {user?.name || "loading..."}
            </h2>
          </Link>
        </div>

        {/* Navigation Section */}
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
          </ul>
        </div>
      </aside>

      {/* ✅ Navbar for small  */}
      <div className="flex justify-center items-center w-full py-4 bg-gray-50 dark:bg-gray-800 md:hidden shadow-sm">
        <ul className="flex flex-row gap-x-5 font-medium text-gray-900 dark:text-white items-center">
          {navbarlg.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `relative flex flex-col items-center py-2 px-4 transition-all duration-300 ${
                    isActive
                      ? "text-blue-700 dark:text-blue-500 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-700 after:rounded-sm"
                      : "hover:text-blue-700 dark:hover:text-blue-500"
                  }`
                }
              >
                {item.icon}
              </NavLink>
            </li>
          ))}

          {/* 🔍 Search Icon */}
          <li>
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 hover:text-blue-700 dark:hover:text-blue-500 transition-all"
            >
              <Search size={22} />
            </button>
          </li>
        </ul>
      </div>

      {/* 🔍 Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Search
            </h3>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)} // ✅ controlled input
              placeholder="Type to search..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            <button
              onClick={() => setShowSearch(false)}
              className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default Header;
