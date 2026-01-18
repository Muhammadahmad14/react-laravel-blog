import { useState, useRef, useEffect } from "react";
import { Settings, LogOut, ChevronDown } from "lucide-react";
import { useLogout } from "../LogoutBtn";
import { Link } from "react-router-dom";

function UserMiniCard({ user, isDropdown = false }) {
  const basePath = "http://127.0.0.1:8000/storage";
  const [open, setOpen] = useState(false);
  const logout = useLogout();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const avatarWithIcon = (
    <button
      onClick={() => setOpen(!open)}
      className="flex items-center gap-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-1 transition"
    >
      <img
        alt={user?.name || "User"}
        src={
          user?.profile_img
            ? `${basePath}/${user.profile_img}`
            : "/default_image.jpg"
        }
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/default_image.jpg";
        }}
        className="h-9 w-9 rounded-full object-cover"
      />
      {isDropdown && (
        <ChevronDown
          size={16}
          className={`dark:text-gray-200 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
        />
      )}
    </button>
  );

  if (!isDropdown) return avatarWithIcon;

  return (
    <div className="relative" ref={dropdownRef}>
      {avatarWithIcon}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50">
          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-red-600 hover:text-white transition"
          >
            <LogOut size={18} />
            Log Out
          </button>
          <Link to={"/setting"}
            className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white transition"
          >
            <Settings size={18} />
            Settings
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserMiniCard;
