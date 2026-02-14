import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Users,
  Tag,
  ImageIcon,
  Settings,
  X,
} from "lucide-react";
function Sidebar({ isOpen, onClose }) {
  const links = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/posts", icon: FileText, label: "Posts" },
    { path: "/admin/comments", icon: MessageSquare, label: "Comments" },
    { path: "/admin/users", icon: Users, label: "Users" },
    { path: "/admin/tags", icon: Tag, label: "Tags" },
    { path: "/admin/media", icon: ImageIcon, label: "Media" },
    { path: "/admin/settings", icon: Settings, label: "Settings" },
  ];
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 shadow-lg`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <NavLink
            to="/admin"
            className="flex items-center gap-3 font-bold text-lg text-gray-900 dark:text-gray-100"
          >
            <span>Blog Admin</span>
          </NavLink>

          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={20} className="text-gray-700 dark:text-gray-200" />
          </button>
        </div>
        <nav className="px-3 py-6 flex flex-col gap-3">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/admin"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white shadow-md"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={20}
                      className={
                        isActive
                          ? "text-blue-700 dark:text-white"
                          : "text-gray-500 dark:text-gray-400"
                      }
                    />
                    <span className="font-medium">{link.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
export default Sidebar;
