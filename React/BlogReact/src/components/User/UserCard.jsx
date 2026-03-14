import { Link } from "react-router-dom";
import FollowButton from "./UserProfile/FollowButton";

const UserCard = ({ user }) => {
  return (
    <div className="flex items-center justify-between p-5 w-full max-w-md rounded-lg shadow-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer mb-3">
      <div className="flex items-center gap-3 flex-1 min-w-0 mr-3">
        <img
          src="/default_image.jpg"
          alt="user"
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />

        <div className="flex flex-col flex-1 min-w-0">
          <Link
            to={`/${user.name}/${user.id}/profile`}
            className="truncate block"
          >
            <span className="text-sm font-semibold text-gray-900 dark:text-white truncate block">
              {user.name}
            </span>
          </Link>
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate block">
            {user.email}
          </span>
        </div>
      </div>
      <div className="flex-shrink-0">
        <FollowButton userid={user.id} />
      </div>
    </div>
  );
};

export default UserCard;
